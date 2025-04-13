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

type TeamInfo struct {
	TeamID    int
	Win       bool
	Champions []string
	Players   []string // Store player names for reference
}

func parseMatch(match *Match) (map[int]TeamInfo, error) {
	teams := make(map[int]TeamInfo)

	for _, team := range match.Info.Teams {
		teams[team.TeamID] = TeamInfo{
			TeamID:    team.TeamID,
			Win:       team.Win,
			Champions: []string{},
			Players:   []string{},
		}
	}

	for _, participant := range match.Info.Participants {
		team := teams[participant.TeamID]

		team.Champions = append(team.Champions, participant.ChampionName)

		teams[participant.TeamID] = team
	}

	return teams, nil
}

func main() {
	account, err := FetchAccount("Crapow", "EUW")

	if err != nil {
		log.Fatal("Error fetching account:", err)
	}

	fmt.Printf("%+v\n", account)

	matches, err := FetchMatches(account.PUUID)

	if err != nil {
		log.Fatal("Error fetching matches:", err)
	}

	fmt.Printf("%+v\n", matches)

	match, err := FetchMatch(matches[0])

	if err != nil {
		log.Fatal("Error fetching match:", err)
	}

	teams, err := parseMatch(match)

	if err != nil {
		log.Fatal("Error parsing match:", err)
	}

	fmt.Printf("%+v\n", teams)
}
