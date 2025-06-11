package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}
	initRedis()
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.Method, r.URL.String(), r.RemoteAddr)
		next.ServeHTTP(w, r)
	})
}

type StatsResponse struct {
	TotalWins        int                  `json:"totalWins"`
	TotalGames       int                  `json:"totalGames"`
	ChampionWinrates []ResultsPerChampion `json:"championWinrates"`
	EnemyWinrates    []ResultPerEnemy     `json:"enemyWinrates"`
}

func statsHandler(w http.ResponseWriter, r *http.Request) {
	gameName := r.URL.Query().Get("gameName")
	tagLine := r.URL.Query().Get("tagLine")
	queueTypeStr := r.URL.Query().Get("queueType")
	gamesStr := r.URL.Query().Get("games")

	var queueType QueueType = QueueAll
	if queueTypeStr != "" {
		queueTypeInt, err := strconv.Atoi(queueTypeStr)
		if err != nil {
			http.Error(w, fmt.Sprintf("Invalid queueType: %v", err), http.StatusBadRequest)
			return
		}
		queueType = QueueType(queueTypeInt)
	}

	games := 100
	if gamesStr != "" {
		gamesInt, err := strconv.Atoi(gamesStr)
		if err != nil {
			http.Error(w, fmt.Sprintf("Invalid games: %v", err), http.StatusBadRequest)
			return
		}
		if gamesInt < 1 || gamesInt > 1000 {
			http.Error(w, "games must be between 1 and 1000", http.StatusBadRequest)
			return
		}
		games = gamesInt
	}

	if gameName == "" || tagLine == "" {
		http.Error(w, "Missing gameName or tagLine", http.StatusBadRequest)
		return
	}

	matches, err := getNGames(gameName, tagLine, games, queueType)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error fetching matches: %v", err), http.StatusInternalServerError)
		return
	}

	totalWins, totalGames, err := getWinrateStats(gameName, matches)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting winrate: %v", err), http.StatusInternalServerError)
		return
	}

	championWinrates, err := getWinrateByChampion(gameName, matches)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting champion winrates: %v", err), http.StatusInternalServerError)
		return
	}

	enemyWinrates, err := getWinrateByEnemyChampion(gameName, matches)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting enemy champion winrates: %v", err), http.StatusInternalServerError)
		return
	}

	response := StatsResponse{
		TotalWins:        totalWins,
		TotalGames:       totalGames,
		ChampionWinrates: championWinrates,
		EnemyWinrates:    enemyWinrates,
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	mux := http.NewServeMux()

	// API endpoints
	mux.HandleFunc("/api/stats", statsHandler)

	loggedMux := loggingMiddleware(mux)

	log.Printf("Server starting on port 8080")
	log.Fatal(http.ListenAndServe(":8080", loggedMux))
}
