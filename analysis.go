package main

import (
	"sort"
)

func getAlly(match *Match, riotIDGameName string) (Participant, error) {
	return Find(match.Info.Participants, func(p Participant) bool {
		return p.RiotIDGameName == riotIDGameName
	})
}

func getAllyTeam(riotIDGameName string) func(match *Match) (Team, error) {
	return func(match *Match) (Team, error) {
		ally, err := getAlly(match, riotIDGameName)

		if err != nil {
			return Team{}, err
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

	matches := make([]*Match, 0, n)
	start := 0

	for n > 0 {
		matchIds, err := FetchMatches(account.PUUID, start, min(n, 100), queueType)

		if err != nil {
			return nil, err
		}

		batchMatches, err := ErrorMap(matchIds, FetchMatch)

		if err != nil {
			return nil, err
		}

		matches = append(matches, batchMatches...)

		n -= 100
		start += 100
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

type ResultsPerChampion struct {
	ChampionName string
	Wins         int
	Games        int
}

func getWinrateByChampion(riotIDGameName, tagLine string, queueType QueueType) ([]ResultsPerChampion, error) {
	matches, err := getNGames(riotIDGameName, tagLine, 200, queueType)

	if err != nil {
		return nil, err
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

	results := make([]ResultsPerChampion, 0, len(matchesByChampion))
	for championName := range matchesByChampion {
		results = append(results, ResultsPerChampion{
			ChampionName: championName,
			Wins:         winsByChampion[championName],
			Games:        len(matchesByChampion[championName]),
		})
	}

	sort.Slice(results, func(i, j int) bool {
		return results[i].Games > results[j].Games
	})

	return results, nil
}

