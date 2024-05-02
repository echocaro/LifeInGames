package main

import (
	"api/auth"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api", auth.AuthRoute)

	router.Run(":8080")
}
