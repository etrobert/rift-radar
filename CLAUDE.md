# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

rift-radar is a League of Legends champion draft analysis tool with multiple components:
- **Backend**: Go API server for Riot Games data analysis and caching
- **Frontend**: Modern React application with champion selection and suggestion features
- **Electron**: Desktop wrapper providing League Client Update (LCU) integration

## Project Structure

```
rift-radar/
├── backend/           # Go API server
│   ├── main.go       # HTTP server with /api/stats endpoint
│   ├── lol_api.go    # Riot Games API client with Redis caching
│   ├── lol_api_types.go # Riot API response type definitions
│   ├── cache.go      # Redis-backed caching system
│   ├── utils.go      # Generic utility functions
│   ├── analysis.go   # Match data analysis functions
│   ├── cache/        # Redis cache data (gitignored)
│   └── .env          # Backend environment variables (gitignored)
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # UI components (ChampionPicker, Suggestions, etc.)
│   │   ├── hooks/      # React hooks (useLCU, useChampions, useURLState)
│   │   ├── types/      # TypeScript type definitions
│   │   └── lib/        # Utility functions and business logic
│   ├── package.json   # Frontend dependencies and scripts
│   └── dist/         # Built frontend files
├── electron-app/      # Electron desktop wrapper
│   ├── main.js       # Main Electron process with LCU integration
│   ├── preload.js    # Secure IPC bridge for renderer process
│   └── package.json  # Electron dependencies and scripts
└── CLAUDE.md         # This file
```

## Backend (Go API Server)

### Core Architecture
- **main.go**: HTTP server with REST API endpoints
- **lol_api.go**: Riot Games API client with caching layer using Redis
- **lol_api_types.go**: Complete type definitions for Riot API responses
- **cache.go**: Redis-backed caching system for match data
- **utils.go**: Generic utility functions (Map, ErrorMap, Find, Count, Must wrappers)
- **analysis.go**: Match data analysis and statistics calculation

### Key Dependencies
- `github.com/joho/godotenv`: Environment variable loading
- `github.com/redis/go-redis/v9`: Redis client for match caching

### Environment Setup
The backend requires a `.env` file in the `backend/` directory with:
- `RIOT_API_KEY`: Your Riot Games API key
- `REDIS_URL`: Redis server URL for caching
- `REDISPASSWORD`: Redis authentication password

### Common Commands
```bash
cd backend
go build .
go run .  # Starts server on port 8080
```

### API Endpoints
- `GET /api/stats?gameName=...&tagLine=...&games=100&queueType=420`: Returns player statistics, champion winrates, and enemy analysis

## Frontend (React Application)

### Core Architecture
- **Modern React 19** with TypeScript and Vite
- **Tailwind CSS** for styling with custom design system
- **React Query** for data fetching and caching
- **Zod** for runtime type validation
- **Component-based architecture** with reusable UI components

### Key Features
- Champion selection with search and filtering
- Real-time suggestions based on team composition
- Damage composition analysis and visualization
- URL state management for shareable drafts
- LCU integration support for live champion select

### Key Dependencies
- React 19, TypeScript, Vite
- @tanstack/react-query, @radix-ui components
- tailwindcss, lucide-react
- zod for schema validation
- hexgate for LCU API types

### Common Commands
```bash
cd frontend
npm install
npm run dev    # Development server
npm run build  # Production build
npm run test   # Run tests
```

## Electron App (Desktop Integration)

### Core Architecture
- **Electron** desktop wrapper for the React frontend
- **LCU Integration** using league-connect for real-time champion select data
- **IPC Security** with context isolation and preload scripts
- **Development/Production** modes with different loading strategies

### Key Features
- Real-time champion select monitoring
- Secure communication between main and renderer processes
- Automatic champion ID to name mapping using Data Dragon API
- WebSocket subscriptions for live LCU updates

### Key Dependencies
- electron for desktop framework
- league-connect for LCU API integration
- hexgate for official LCU API types

### Common Commands
```bash
cd electron-app
npm install
npm run dev    # Development mode (loads from localhost:5173)
npm run build  # Build frontend and copy to electron
npm start      # Production mode
```

## Data Flow

### Backend Data Flow
1. **Account Lookup**: Fetch account data by riot ID and tag line
2. **Match History**: Retrieve match IDs with optional queue filtering
3. **Match Details**: Fetch individual match data with Redis caching
4. **Analysis**: Process matches to calculate champion win rates and statistics

### Frontend Data Flow
1. **Champion Selection**: Users pick/ban champions via UI
2. **Real-time Analysis**: Calculate damage composition and suggestions
3. **URL State**: Maintain shareable draft state in URL parameters
4. **LCU Integration**: Sync with live League client champion select (via Electron)

### LCU Integration Flow (Electron)
1. **Authentication**: Connect to League Client using league-connect
2. **WebSocket Subscription**: Listen for champion select session updates
3. **Data Processing**: Map champion IDs to names using Data Dragon API
4. **UI Updates**: Send processed data to React frontend via IPC

## Key Functions

### Backend
- `getNGames()`: Fetches N matches for a player with batch loading
- `getWinrate()`: Calculates overall win rate from recent matches
- `getWinrateByChampion()`: Groups matches by champion and calculates win/loss ratios
- `getWinrateByEnemyChampion()`: Analyzes performance against enemy champions

### Frontend
- `useLCU()`: Custom hook for LCU integration and real-time updates
- `useChampions()`: Data fetching hook for champion information
- `useURLState()`: URL state management for draft persistence
- `calculateDamageComposition()`: Analyze team damage types and balance

## Cache Strategy

Match data is cached in Redis with keys like `match/{matchId}` to minimize API calls and improve performance. Cache is stored in `backend/cache/` directory.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.