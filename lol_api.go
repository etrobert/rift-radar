package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

var baseUrl = "https://europe.api.riotgames.com/"

var client = &http.Client{}

func FetchAccount(gameName, tagLine string) (Account, error) {
	summonerURL := baseUrl + "riot/account/v1/accounts/by-riot-id/Crapow/EUW"

	var apiKey = os.Getenv("RIOT_API_KEY")

	// Create a request with Riot API key header
	req, _ := http.NewRequest("GET", summonerURL, nil)
	req.Header.Add("X-Riot-Token", apiKey)

	resp, err := client.Do(req)

	if err != nil {
		return Account{}, err
	}

	if resp.StatusCode != http.StatusOK {
		return Account{}, fmt.Errorf("error: %s", resp.Status)
	}

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return Account{}, err
	}

	// Decode JSON into struct
	var account Account
	if err := json.Unmarshal(body, &account); err != nil {
		return Account{}, err
	}

	return account, nil
}

func FetchMatches(puuid string) ([]string, error) {
	matchesURL := baseUrl + "lol/match/v5/matches/by-puuid/" + puuid + "/ids"

	var apiKey = os.Getenv("RIOT_API_KEY")
	req, _ := http.NewRequest("GET", matchesURL, nil)
	req.Header.Add("X-Riot-Token", apiKey)

	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var matches []string
	if err := json.Unmarshal(body, &matches); err != nil {
		return nil, err
	}

	return matches, nil
}
