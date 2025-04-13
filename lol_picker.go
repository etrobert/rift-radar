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

func getAllyTeamId(match *Match) (int, error) {
	for _, participant := range match.Info.Participants {
		if participant.RiotIDGameName == "Crapow" {
			return participant.TeamID, nil
		}
	}
	return 0, fmt.Errorf("player not found in match")
}

func getAllyTeam(match *Match) (Team, error) {
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

func isWinningTeam(team Team) bool {
	return team.Win
}

func main() {
	account := Must2(FetchAccount)("Crapow", "EUW")

	fmt.Printf("%+v\n", account)

	matchIds := Must2(FetchMatches)(account.PUUID, 100)

	fmt.Printf("%+v\n", matchIds)

	matches := Map(matchIds, Must(FetchMatch))

	allyTeams := Map(matches, Must(getAllyTeam))

	wins := Count(Map(allyTeams, isWinningTeam), Identity)

	fmt.Printf("%+v\n", wins)
}
