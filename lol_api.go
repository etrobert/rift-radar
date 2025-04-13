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

func makeRequest(client *http.Client, url string) ([]byte, error) {
	var apiKey = os.Getenv("RIOT_API_KEY")

	final_url := baseUrl + url

	// Create a request with Riot API key header
	req, _ := http.NewRequest("GET", final_url, nil)
	req.Header.Add("X-Riot-Token", apiKey)
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error: %s", resp.Status)
	}

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}

func FetchAccount(gameName, tagLine string) (Account, error) {
	url := "riot/account/v1/accounts/by-riot-id/" + gameName + "/" + tagLine
	body, err := makeRequest(client, url)

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
	url := "lol/match/v5/matches/by-puuid/" + puuid + "/ids"

	body, err := makeRequest(client, url)

	if err != nil {
		return nil, err
	}

	var matches []string
	if err := json.Unmarshal(body, &matches); err != nil {
		return nil, err
	}

	return matches, nil
}
