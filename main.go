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

func winrateHandler(w http.ResponseWriter, r *http.Request) {
	riotIDGameName := r.URL.Query().Get("riotIDGameName")
	tagLine := r.URL.Query().Get("tagLine")

	if riotIDGameName == "" || tagLine == "" {
		http.Error(w, "Missing riotIDGameName or tagLine", http.StatusBadRequest)
		return
	}

	wins, err := getWinrate(riotIDGameName, tagLine)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting winrate: %v", err), http.StatusInternalServerError)
		return
	}

	response := map[string]int{"winrate": wins}
	json.NewEncoder(w).Encode(response)
}

func winrateByChampionHandler(w http.ResponseWriter, r *http.Request) {
	riotIDGameName := r.URL.Query().Get("riotIDGameName")
	tagLine := r.URL.Query().Get("tagLine")
	queueTypeStr := r.URL.Query().Get("queueType")

	var queueType QueueType = QueueAll
	if queueTypeStr != "" {
		queueTypeInt, err := strconv.Atoi(queueTypeStr)
		if err != nil {
			http.Error(w, fmt.Sprintf("Invalid queueType: %v", err), http.StatusBadRequest)
			return
		}
		queueType = QueueType(queueTypeInt)
	}

	if riotIDGameName == "" || tagLine == "" {
		http.Error(w, "Missing riotIDGameName or tagLine", http.StatusBadRequest)
		return
	}

	results, err := getWinrateByChampion(riotIDGameName, tagLine, queueType)

	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting winrate by champion: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/winrate", winrateHandler)
	mux.HandleFunc("/winrateByChampion", winrateByChampionHandler)

	loggedMux := loggingMiddleware(mux)

	log.Printf("Server starting on port 8080")
	log.Fatal(http.ListenAndServe(":8080", loggedMux))
}
