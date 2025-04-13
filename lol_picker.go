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

func getAllyTeam(match *Match) (Team, error) {
	ally, err := Find(match.Info.Participants, func(p Participant) bool {
		return p.RiotIDGameName == "Crapow"
	})

	if err != nil {
		log.Fatal("Error getting ally team ID:", err)
	}

	return Find(match.Info.Teams, func(team Team) bool {
		return team.TeamID == ally.TeamID
	})
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
