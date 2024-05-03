package auth

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func Token(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	var requestBody struct {
		Code string `json:"code"`
	}
	// Log incoming request body
	if err := c.BindJSON(&requestBody); err != nil {
		c.String(http.StatusBadRequest, "Invalid request body")
		return
	}


	authorizationCode := requestBody.Code

	if authorizationCode == "" {
		c.String(http.StatusBadRequest, "Authorization code not found")
		return
	}

	twitchTokenURL := "https://id.twitch.tv/oauth2/token"
	twitchTokenURL += "?client_id=" + os.Getenv("TWITCH_API")
	twitchTokenURL += "&client_secret=" + os.Getenv("TWITCH_SECRET")
	twitchTokenURL += "&code=" + authorizationCode
	twitchTokenURL += "&grant_type=authorization_code"
	twitchTokenURL += "&redirect_uri=http://localhost:3000/home"

	response, err := http.Post(twitchTokenURL, "", nil)

	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to retrieve access token")
		return
	}

	defer response.Body.Close()

	responseBody, err := io.ReadAll(response.Body)

	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to retrieve access token")
		return
	}

	c.String(response.StatusCode, string(responseBody))
}
