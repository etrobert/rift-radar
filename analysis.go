package main

import (
	"fmt"
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

func getEnemyTeam(gameName string) func(match *Match) (Team, error) {
	return func(match *Match) (Team, error) {
		ally, err := getAlly(match, gameName)

		if err != nil {
			return Team{}, err
		}

		return Find(match.Info.Teams, func(team Team) bool {
			return team.TeamID != ally.TeamID
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

func getWinrate(gameName string, matches []*Match) (int, error) {
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

type ResultPerEnemy struct {
	ChampionName string
	Wins         int
	Games        int
}

func getWinrateByEnemyChampion(gameName string, matches []*Match) ([]ResultPerEnemy, error) {
	wins := make(map[string]int)
	games := make(map[string]int)

	for _, match := range matches {
		enemyTeam, err := getEnemyTeam(gameName)(match)

		if err != nil {
			return nil, err
		}

		for _, enemy := range match.Info.Participants {
			if enemy.TeamID == enemyTeam.TeamID {
				games[enemy.ChampionName]++
				if !enemy.Win {
					wins[enemy.ChampionName]++
				}
			}
		}
	}

	results := make([]ResultPerEnemy, 0, len(games))

	for championName := range games {
		results = append(results, ResultPerEnemy{
			ChampionName: championName,
			Wins:         wins[championName],
			Games:        games[championName],
		})
	}

	sort.Slice(results, func(i, j int) bool {
		return results[i].Games > results[j].Games
	})

	return results, nil
}

type ResultsPerChampion struct {
	ChampionName string
	Wins         int
	Games        int
}

func getWinrateByChampion(gameName string, matches []*Match) ([]ResultsPerChampion, error) {
	matchesByChampion := make(map[string][]*Match)
	winsByChampion := make(map[string]int)

	for _, match := range matches {
		ally, err := getAlly(match, gameName)

		if err != nil {
			return nil, fmt.Errorf("error getting ally for gameName=%s: %w", gameName, err)
		}

		allyTeam, err := getAllyTeam(gameName)(match)
		if err != nil {
			return nil, fmt.Errorf("error getting ally team for gameName=%s: %w", gameName, err)
		}

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
