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
			AllowOrigins:     []string{"http://localhost:3000", "https://www.thegamerswave.com"},
			AllowMethods:     []string{"GET", "POST", "OPTIONS"},
			AllowHeaders:     []string{"Content-Type", "Authorization", "Access-Control-Allow-Origin"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
	}))

	router.GET("/", endpoints.HealthCheck)
	router.GET("/login", endpoints.Login)
	router.GET("/callback", endpoints.Callback)
	router.GET("/:steamId/games", endpoints.OwnedGames)
	router.GET("/:steamId/games-data", endpoints.GamePlayData)
	router.GET("/:steamId/top-games", endpoints.GetTopGames)
	router.GET("/:steamId/top-genres", endpoints.GetTopGenres)

	router.Run(":8080")
}
