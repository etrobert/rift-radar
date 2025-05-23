package main

import (
	"fmt"
	"log"

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

func getHundredGames(riotIDGameName, tagLine string) ([]*Match, error) {
	account, err := FetchAccount(riotIDGameName, tagLine)

	if err != nil {
		return nil, err
	}

	matchIds, err := FetchMatches(account.PUUID, 100)

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
	matches, err := getHundredGames(riotIDGameName, tagLine)

	if err != nil {
		return 0, err
	}

	allyTeams, err := ErrorMap(matches, getAllyTeam(riotIDGameName))

	if err != nil {
		return 0, err
	}

	return Count(allyTeams, isWinningTeam), nil
}

func getEnemies(riotIDGameName, tagLine string) (map[string]int, error) {
	matches, err := getHundredGames(riotIDGameName, tagLine)

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
	fmt.Printf("Enemies:\n")
	enemies, err := getEnemies("Crapow", "EUW")
	if err != nil {
		log.Fatal("Error getting enemies:", err)
	}
	for enemy, count := range enemies {
		fmt.Printf("%s: %d\n", enemy, count)
	}

	// printWinrate("Crapow")
	// printWinrate("Beigeres")
	// printWinrate("titius33")
}
