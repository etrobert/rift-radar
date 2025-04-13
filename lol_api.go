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

type TeamInfo struct {
	TeamID    int
	Win       bool
	Champions []string
	Players   []string // Store player names for reference
}

func FetchMatch(matchId string) (map[int]TeamInfo, error) {
	url := "lol/match/v5/matches/" + matchId

	body, err := makeRequest(client, url)

	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON response into the Match struct
	var match Match
	err = json.Unmarshal(body, &match)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling match data: %v", err)
	}

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
