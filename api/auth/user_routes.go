package auth

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func AuthRoute(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow
	twitchAuthUrl := "https://id.twitch.tv/oauth2/authorize"
	twitchRedirectURI := "https://localhost:3000/" // temp. not sure i like this
	twitchClientId := os.Getenv("TWITCH_API")      // need to get this

	println(twitchClientId)

	authUrl := twitchAuthUrl + "?response_type=code&client_id=" + twitchClientId + "&redirect_uri=" + twitchRedirectURI + "&scope=user_read"

	c.Redirect(http.StatusFound, authUrl)
}
