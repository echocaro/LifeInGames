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

	log.Println("what is c: ", c)

	var requestBody struct {
		Code string `json:"code"`
	}
	// Log incoming request body
	if err := c.BindJSON(&requestBody); err != nil {
		log.Println("Error parsing request body:", err)
		c.String(http.StatusBadRequest, "Invalid request body")
		// return
	}

	log.Println("Request Body:", requestBody)

	authorizationCode := requestBody.Code

	if authorizationCode == "" {
		log.Println("Authorization code not found")
		c.String(http.StatusBadRequest, "Authorization code not found")
		return
	}

	twitchTokenURL := "https://id.twitch.tv/oauth2/token"
	twitchTokenURL += "?client_id=" + os.Getenv("TWITCH_API")
	twitchTokenURL += "&client_secret=" + os.Getenv("TWITCH_SECRET")
	twitchTokenURL += "&code=" + authorizationCode
	twitchTokenURL += "&grant_type=authorization_code"
	twitchTokenURL += "&redirect_uri=http://localhost:3000/home"

	log.Println("URL: ", twitchTokenURL)

	response, err := http.Post(twitchTokenURL, "", nil)
	log.Println("This is the error: ", err)
	if err != nil {
		log.Println("Failed to retrieve access token:", err)
		c.String(http.StatusInternalServerError, "Failed to retrieve access token")
		return
	}

	log.Println("This is the response: ", response)
	defer response.Body.Close()

	responseBody, err := io.ReadAll(response.Body)

	log.Println("response body: ", string(responseBody))
	if err != nil {
		log.Println("Failed to read response body:", err)
		c.String(http.StatusInternalServerError, "Failed to retrieve access token")
		return
	}

	c.String(response.StatusCode, string(responseBody))
}
