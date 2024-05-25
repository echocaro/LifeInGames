package endpoints

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/yohcop/openid-go"
)

var nonceStore = openid.NewSimpleNonceStore()
var discoveryCache = openid.NewSimpleDiscoveryCache()

func Login(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	openidURL := "https://steamcommunity.com/openid"

	apiUrl := os.Getenv("BASE_API_URL_PROD")

	url, err := openid.RedirectURL(openidURL, apiUrl+"callback", apiUrl)
	if err != nil {
		log.Println("Error when redirecting to Steam login:", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	c.Redirect(http.StatusFound, url)
}

func Callback(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	apiUrl := os.Getenv("API_URL_PROD")
	webApi := os.Getenv("WEB_URL_PROD")

	fullUrl := apiUrl + c.Request.RequestURI

	id, err := openid.Verify(fullUrl, discoveryCache, nonceStore)
	if err != nil {
		c.JSON(http.StatusForbidden, "Could not verify your steam account")
	}

	parts := strings.Split(id, "/")
	steamId := parts[len(parts)-1]

	c.Redirect(http.StatusFound, webApi+"?steamId="+steamId)
}
