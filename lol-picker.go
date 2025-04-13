package main

import (
	"encoding/json"
	"fmt"
	"github.com/joho/godotenv"
	"io"
	"log"
	"net/http"
	"os"
)

type Account struct {
	PUUID    string `json:"puuid"`
	GameName string `json:"gameName"`
	TagLine  string `json:"tagLine"`
}

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("RIOT_API_KEY")

	summonerURL := "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Crapow/EUW"

	// Create a request with Riot API key header
	req, _ := http.NewRequest("GET", summonerURL, nil)
	req.Header.Add("X-Riot-Token", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("Error reading response:", err)
	}

	// Decode JSON into struct
	var account Account
	if err := json.Unmarshal(body, &account); err != nil {
		log.Fatal("Error decoding JSON:", err)
	}

	fmt.Printf("%+v\n", account)
}
