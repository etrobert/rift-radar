package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/winrate", winrateHandler)

	loggedMux := loggingMiddleware(mux)

	log.Printf("Server starting on port 8080")
	log.Fatal(http.ListenAndServe(":8080", loggedMux))
}
