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

func main() {
	account, err := FetchAccount("Crapow", "EUW")

	if err != nil {
		log.Fatal("Error fetching account:", err)
	}

	fmt.Printf("%+v\n", account)

	matches, err := FetchMatches(account.PUUID)

	fmt.Printf("%+v\n", matches)

	teams, err := FetchMatch(matches[0])

	fmt.Printf("%+v\n", teams)
}
