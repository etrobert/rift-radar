package main

import (
	"sort"
)

func getAlly(match *Match, gameName string) (Participant, error) {
	return Find(match.Info.Participants, func(p Participant) bool {
		return p.RiotIDGameName == gameName
	})
}

func getAllyTeam(gameName string) func(match *Match) (Team, error) {
	return func(match *Match) (Team, error) {
		ally, err := getAlly(match, gameName)

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

func getNGames(gameName, tagLine string, n int, queueType QueueType) ([]*Match, error) {
	account, err := FetchAccount(gameName, tagLine)

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

func getWinrate(gameName, tagLine string, queueType QueueType, games int) (int, error) {
	matches, err := getNGames(gameName, tagLine, games, queueType)

	if err != nil {
		return 0, err
	}

	if len(matches) == 0 {
		return 0, nil
	}

	allyTeams, err := ErrorMap(matches, getAllyTeam(gameName))

	if err != nil {
		return 0, err
	}

	wins := Count(allyTeams, isWinningTeam)
	return (wins * 100) / len(matches), nil
}

func getEnemies(gameName, tagLine string, queueType QueueType) (map[string]int, error) {
	matches, err := getNGames(gameName, tagLine, 100, queueType)

	if err != nil {
		return nil, err
	}

	enemies := make(map[string]int)

	for _, match := range matches {
		allyTeam, err := getAllyTeam(gameName)(match)

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

func getWinrateByChampion(gameName, tagLine string, queueType QueueType, games int) ([]ResultsPerChampion, error) {
	matches, err := getNGames(gameName, tagLine, games, queueType)

	if err != nil {
		return nil, err
	}

	matchesByChampion := make(map[string][]*Match)
	winsByChampion := make(map[string]int)

	for _, match := range matches {
		ally := Must2(getAlly)(match, gameName)
		allyTeam := Must(getAllyTeam(gameName))(match)

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

