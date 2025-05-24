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
	initRedis()
}

func printWinrate(riotIDGameName, tagLine string) {
	wins, err := getWinrate(riotIDGameName, tagLine)

	if err != nil {
		log.Fatal("Error getting winrate:", err)
	}

	fmt.Printf("Winrate for %s: %d%%\n", riotIDGameName, wins)
}

func main() {
	results, err := getWinrateByChampion("Beigeres", "EUW", QueueRankedSolo)

	if err != nil {
		log.Fatal("Error getting winrate by champion:", err)
	}

	for _, result := range results {
		fmt.Printf("%13s: %2d / %-2d %.2f%%\n",
			result.ChampionName, result.Wins, result.Games,
			float64(result.Wins)/float64(result.Games)*100)
	}
}
