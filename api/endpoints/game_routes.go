package endpoints

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type GameInfo struct {
	AppID     int    `json:"appid"`
	Name      string `json:"name"`
	Playtime  int    `json:"playtime_forever"`
	ImageURL string
}

func OwnedGames(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	steamID := c.Query("steamid")

	steamAPIKey := os.Getenv("STEAM_API_KEY")
	if steamAPIKey == "" {
		log.Println("Steam API key not found")
		c.String(http.StatusInternalServerError, "Steam API key not found")
		return
	}

	url := fmt.Sprintf("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=%s&steamid=%s&include_appinfo=1", steamAPIKey, steamID)

	response, err := http.Get(url)

	if err != nil {
		log.Printf("Failed to make request: %v", err)
		c.String(http.StatusInternalServerError, "Failed to make request to Steam Web API")
		return
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)

	if err != nil {
		log.Printf("Failed to read response body: %v", err)
		c.String(http.StatusInternalServerError, "Failed to read response body")
		return
	}

	log.Println("Body: ", string(body))

	var gamesResponse struct {
		Response struct {
			Games []GameInfo `json:"games"`
		} `json:"response"`
	}

	if err := json.Unmarshal(body, &gamesResponse); err != nil {
		log.Printf("Failed to parse JSON response: %v", err)
		c.String(http.StatusInternalServerError, "Failed to parse JSON response")
		return
	}

	for i := range gamesResponse.Response.Games {
    gamesResponse.Response.Games[i].ImageURL = fmt.Sprintf("https://cdn.akamai.steamstatic.com/steam/apps/%d/header.jpg", gamesResponse.Response.Games[i].AppID)
	}

	c.JSON(http.StatusOK, gamesResponse.Response.Games)
}
