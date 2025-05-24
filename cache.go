package main

import (
	"fmt"
	"os"
)

func getCachedMatch(matchId string) ([]byte, error) {
	path := fmt.Sprintf("cache/matches/%s.json", matchId)
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("error reading cache file: %v", err)
	}

	return data, nil
}

func saveMatchToCache(matchId string, data []byte) error {
	os.MkdirAll("cache/matches", 0755)

	path := fmt.Sprintf("cache/matches/%s.json", matchId)
	return os.WriteFile(path, data, 0644)
}
