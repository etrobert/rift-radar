# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

lol-picker is a Go application that analyzes League of Legends match data using the Riot Games API. It fetches player statistics, calculates win rates, and provides champion performance analysis.

## Core Architecture

- **lol_picker.go**: Main application logic with functions for analyzing match data, calculating win rates, and generating champion statistics
- **lol_api.go**: Riot Games API client with caching layer using Redis for match data
- **lol_api_types.go**: Complete type definitions for Riot API responses (Account, Match, Participant, Team structures)
- **cache.go**: Redis-backed caching system for match data to reduce API calls
- **utils.go**: Generic utility functions (Map, ErrorMap, Find, Count, Must wrappers)

## Key Dependencies

- `github.com/joho/godotenv`: Environment variable loading
- `github.com/redis/go-redis/v9`: Redis client for match caching

## Environment Setup

The application requires a `.env` file with:
- `RIOT_API_KEY`: Your Riot Games API key
- `REDIS_URL`: Redis server URL for caching
- `REDISPASSWORD`: Redis authentication password

## Common Commands

Build the application:
```bash
go build .
```

Run the application:
```bash
go run .
```

## Data Flow

1. **Account Lookup**: Fetch account data by riot ID and tag line
2. **Match History**: Retrieve match IDs with optional queue filtering
3. **Match Details**: Fetch individual match data with Redis caching
4. **Analysis**: Process matches to calculate champion win rates and statistics

## Key Functions

- `getNGames()`: Fetches N matches for a player with batch loading
- `getWinrate()`: Calculates overall win rate from recent matches
- `getEnemies()`: Analyzes enemy champions from losing games
- Champion analysis in main(): Groups matches by champion and calculates win/loss ratios

## Cache Strategy

Match data is cached in Redis with keys like `match/{matchId}` to minimize API calls and improve performance.