package main

import (
	"context"
	"os"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

var rdb *redis.Client

func initRedis() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDISHOST") + ":" + os.Getenv("REDISPORT"),
		Password: os.Getenv("REDISPASSWORD"),
		DB:       0,
	})
}

func getCachedMatch(matchId string) ([]byte, error) {
	return rdb.Get(ctx, "match/"+matchId).Bytes()
}

func saveMatchToCache(matchId string, data []byte) error {
	return rdb.Set(ctx, "match/"+matchId, data, 0).Err()
}
