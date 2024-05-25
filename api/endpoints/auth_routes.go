package endpoints

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/yohcop/openid-go"
)

var nonceStore = openid.NewSimpleNonceStore()
var discoveryCache = openid.NewSimpleDiscoveryCache()

func Login(c *gin.Context) {
	openidURL := "https://steamcommunity.com/openid"

	returnTo := "http://localhost:8080/callback"
	realm := "http://localhost:8080/"

	url, err := openid.RedirectURL(openidURL, returnTo, realm)
	if err != nil {
		log.Println("Error when redirecting to Steam login:", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	c.Redirect(http.StatusFound, url)
}

func Callback(c *gin.Context) {
	fullUrl := "http://localhost:8080" + c.Request.RequestURI

	id, err := openid.Verify(fullUrl, discoveryCache, nonceStore)
	if err != nil {
		c.JSON(http.StatusForbidden, "Could not verify your steam account")
	}

	parts := strings.Split(id, "/")
	steamId := parts[len(parts)-1]

	frontendURL := "http://localhost:3000/"
	c.Redirect(http.StatusFound, frontendURL+"steamId="+steamId)
}
