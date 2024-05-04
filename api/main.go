package main

import (
	"api/endpoints"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour, // Preflight request cache duration
	}))

	router.GET("/games", endpoints.OwnedGames)
	router.GET("games-data", endpoints.GamePlayData)
	router.GET("/top-games", endpoints.GetTopGames)

	router.Run(":8080")
}
