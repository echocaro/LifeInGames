package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthRoute() {
	router := gin.Default()

	// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow
	router.GET("/auth/twitch", func(c *gin.Context) {
		twitchAuthUrl := "https://id.twitch.tv/oauth2/authorize"
		twitchRedirectURI := "/approved" // temp. not sure i like this
		twitchClientId := ""             // need to get this

		authUrl := twitchAuthUrl + "?client_id=" + twitchClientId + "&redirect_uri=" + twitchRedirectURI + "&response_type=code&scope=user_read"

		c.Redirect(http.StatusFound, authUrl)
	})
}
