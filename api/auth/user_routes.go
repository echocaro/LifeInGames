package auth

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func AuthRoute(c *gin.Context) {
	// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow
	twitchAuthUrl := "https://id.twitch.tv/oauth2/authorize"
	twitchRedirectURI := "/approved"          // temp. not sure i like this
	twitchClientId := os.Getenv("TWITCH_API") // need to get this

	authUrl := twitchAuthUrl + "?client_id=" + twitchClientId + "&redirect_uri=" + twitchRedirectURI + "&response_type=code&scope=user_read"

	c.Redirect(http.StatusFound, authUrl)
}
