package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"log"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}
}

type Participant struct {
	ChampionName   string
	RiotIDGameName string
}

type TeamInfo struct {
	TeamID       int
	Win          bool
	Participants []Participant
}

func parseMatch(match *Match) (map[int]TeamInfo, error) {
	teams := make(map[int]TeamInfo)

	for _, team := range match.Info.Teams {
		teams[team.TeamID] = TeamInfo{
			TeamID:       team.TeamID,
			Win:          team.Win,
			Participants: []Participant{},
		}
	}

	for _, participant := range match.Info.Participants {
		team := teams[participant.TeamID]

		team.Participants = append(team.Participants, Participant{
			ChampionName:   participant.ChampionName,
			RiotIDGameName: participant.RiotIDGameName,
		})

		teams[participant.TeamID] = team
	}

	return teams, nil
}

func getAllyTeamId(match Match) (int, error) {
	for _, participant := range match.Info.Participants {
		if participant.RiotIDGameName == "Crapow" {
			return participant.TeamID, nil
		}
	}
	return 0, fmt.Errorf("player not found in match")
}

func getAllyTeam(match Match) (Team, error) {
	allyTeamId, err := getAllyTeamId(match)

	if err != nil {
		log.Fatal("Error getting ally team ID:", err)
	}

	for _, team := range match.Info.Teams {
		if team.TeamID == allyTeamId {
			return team, nil
		}
	}

	return Team{}, fmt.Errorf("team not found")
}

func Map[T, U any](slice []T, fn func(T) U) []U {
	result := make([]U, len(slice))
	for i, v := range slice {
		result[i] = fn(v)
	}
	return result
}

func Must[T, U any](fn func(T) (U, error)) func(T) U {
	return func(t T) U {
		result, err := fn(t)
		if err != nil {
			panic(err)
		}
		return result
	}
}

func main() {
	account, err := FetchAccount("Crapow", "EUW")

	if err != nil {
		log.Fatal("Error fetching account:", err)
	}

	fmt.Printf("%+v\n", account)

	matchIds, err := FetchMatches(account.PUUID, 100)

	if err != nil {
		log.Fatal("Error fetching matches:", err)
	}

	fmt.Printf("%+v\n", matchIds)

	matches := Map(matchIds, Must(FetchMatch))

	match := matches[0]

	allyTeam := Must(getAllyTeam)(*match)

	fmt.Printf("%+v\n", allyTeam.Win)
}
