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

func getAllyTeam(riotIDGameName string) func(match *Match) (Team, error) {
	return func(match *Match) (Team, error) {
		ally, err := Find(match.Info.Participants, func(p Participant) bool {
			return p.RiotIDGameName == riotIDGameName
		})

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

func getWinrate(riotIDGameName string) (int, error) {
	account, err := FetchAccount(riotIDGameName, "EUW")

	if err != nil {
		return 0, err
	}

	matchIds, err := FetchMatches(account.PUUID, 100)

	if err != nil {
		return 0, err
	}

	matches, err := ErrorMap(matchIds, FetchMatch)

	if err != nil {
		return 0, err
	}

	allyTeams, err := ErrorMap(matches, getAllyTeam(riotIDGameName))

	if err != nil {
		return 0, err
	}

	return Count(allyTeams, isWinningTeam), nil
}

func printWinrate(riotIDGameName string) {
	wins, err := getWinrate(riotIDGameName)

	if err != nil {
		log.Fatal("Error getting winrate:", err)
	}

	fmt.Printf("Winrate for %s: %d%%\n", riotIDGameName, wins)
}

func main() {
	printWinrate("Crapow")
	printWinrate("Beigeres")
	printWinrate("titius33")
}
