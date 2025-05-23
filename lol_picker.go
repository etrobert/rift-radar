package main

import (
	"fmt"
	"log"
	"sort"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}
}

func getAlly(match *Match, riotIDGameName string) (Participant, error) {
	return Find(match.Info.Participants, func(p Participant) bool {
		return p.RiotIDGameName == riotIDGameName
	})
}

func getAllyTeam(riotIDGameName string) func(match *Match) (Team, error) {
	return func(match *Match) (Team, error) {
		ally, err := getAlly(match, riotIDGameName)

		if err != nil {
			log.Fatal("Error getting ally team ID:", err)
		}

		return Find(match.Info.Teams, func(team Team) bool {
			return team.TeamID == ally.TeamID
		})
	}
}

func isWinningTeam(team Team) bool {
	return team.Win
}

func getNGames(riotIDGameName, tagLine string, n int, queueType QueueType) ([]*Match, error) {
	account, err := FetchAccount(riotIDGameName, tagLine)

	if err != nil {
		return nil, err
	}

	matchIds, err := FetchMatches(account.PUUID, n, queueType)

	if err != nil {
		return nil, err
	}

	matches, err := ErrorMap(matchIds, FetchMatch)

	if err != nil {
		return nil, err
	}

	return matches, nil
}

func getWinrate(riotIDGameName, tagLine string) (int, error) {
	matches, err := getNGames(riotIDGameName, tagLine, 100, QueueRankedSolo)

	if err != nil {
		return 0, err
	}

	allyTeams, err := ErrorMap(matches, getAllyTeam(riotIDGameName))

	if err != nil {
		return 0, err
	}

	return Count(allyTeams, isWinningTeam), nil
}

func getEnemies(riotIDGameName, tagLine string, queueType QueueType) (map[string]int, error) {
	matches, err := getNGames(riotIDGameName, tagLine, 100, queueType)

	if err != nil {
		return nil, err
	}

	enemies := make(map[string]int)

	for _, match := range matches {
		allyTeam, err := getAllyTeam(riotIDGameName)(match)

		if err != nil {
			return nil, err
		}

		firstEnemy, err := Find(match.Info.Participants, func(p Participant) bool {
			return p.TeamID != allyTeam.TeamID
		})

		if err != nil {
			return nil, err
		}

		enemyTeamID := firstEnemy.TeamID

		enemyTeam, err := Find(match.Info.Teams, func(t Team) bool {
			return t.TeamID == enemyTeamID
		})

		if !enemyTeam.Win {
			continue
		}

		for _, enemy := range match.Info.Participants {
			if enemy.TeamID == enemyTeamID {
				enemies[enemy.ChampionName]++
			}
		}
	}

	return enemies, nil
}

func printWinrate(riotIDGameName, tagLine string) {
	wins, err := getWinrate(riotIDGameName, tagLine)

	if err != nil {
		log.Fatal("Error getting winrate:", err)
	}

	fmt.Printf("Winrate for %s: %d%%\n", riotIDGameName, wins)
}

func main() {
	// fmt.Printf("Enemies:\n")
	// enemies, err := getEnemies("Crapow", "EUW", QueueRankedSolo)
	// if err != nil {
	// 	log.Fatal("Error getting enemies:", err)
	// }
	// for enemy, count := range enemies {
	// 	fmt.Printf("%s: %d\n", enemy, count)
	// }

	riotIDGameName := "titius33"
	matches, err := getNGames(riotIDGameName, "EUW", 100, QueueAll)

	if err != nil {
		log.Fatal("Error getting matches:", err)
	}

	matchesByChampion := make(map[string][]*Match)
	winsByChampion := make(map[string]int)

	for _, match := range matches {
		ally := Must2(getAlly)(match, riotIDGameName)
		allyTeam := Must(getAllyTeam(riotIDGameName))(match)

		matchesByChampion[ally.ChampionName] = append(matchesByChampion[ally.ChampionName], match)
		if allyTeam.Win {
			winsByChampion[ally.ChampionName]++
		}
	}

	keys := make([]string, 0, len(matchesByChampion))
	for champion := range matchesByChampion {
		keys = append(keys, champion)
	}

	sort.Slice(keys, func(i, j int) bool {
		return len(matchesByChampion[keys[i]]) > len(matchesByChampion[keys[j]])
	})

	for _, champion := range keys {
		fmt.Printf("%13s %2d / %-2d\n",
			champion,
			winsByChampion[champion],
			len(matchesByChampion[champion]),
		)
	}

	// printWinrate("Crapow")
	// printWinrate("Beigeres")
	// printWinrate("titius33")
}
