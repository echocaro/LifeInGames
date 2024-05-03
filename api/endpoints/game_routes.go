package endpoints

import (
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func TopGames(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	log.Println("what is header: ", c.GetHeader("Authorization"))
	accessToken := c.GetHeader("Authorization")

	if accessToken == "" {
		accessToken = c.Query("access_token")
	}

	if accessToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Access token not provided"})
		return
	}

	log.Println("access token: ", accessToken)

	twitchURL := "https://api.twitch.tv/helix/games/top?first=5"

	req, err := http.NewRequest(http.MethodGet, twitchURL, nil)

	log.Println("Error after creating rquest: ", err)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err })
		return
	}

	req.Header.Add("Authorization", "Bearer " + accessToken)
	req.Header.Add("Client-Id", os.Getenv("TWITCH_API"))

	client := &http.Client{Timeout: 10 *time.Second}
	response, newErr := client.Do(req)

	log.Println("Response: ", response)

	if newErr != nil {
		return
	}

	defer response.Body.Close()

	responseBody, respErr := io.ReadAll(response.Body)

	if respErr != nil {
		log.Println("Failed to read response body:", err)
		c.String(http.StatusInternalServerError, "Failed to retrieve access token")
		return
	}

	c.String(response.StatusCode, string(responseBody))
}
