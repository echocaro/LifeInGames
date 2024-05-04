package externalapi

import (
	"api/utils"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func FetchOwnedGames(c *gin.Context) []utils.GameInfo {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	steamID := c.Param("steamId")

	steamAPIKey := os.Getenv("STEAM_API_KEY")
	if steamAPIKey == "" {
		log.Println("Steam API key not found")
		c.String(http.StatusInternalServerError, "Steam API key not found")
		return nil
	}

	url := fmt.Sprintf("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=%s&steamid=%s&include_appinfo=1", steamAPIKey, steamID)

	response, err := http.Get(url)

	if err != nil {
		log.Printf("Failed to make request: %v", err)
		c.String(http.StatusInternalServerError, "Failed to make request to Steam Web API")
		return nil
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)

	if err != nil {
		log.Printf("Failed to read response body: %v", err)
		c.String(http.StatusInternalServerError, "Failed to read response body")
		return nil
	}

	var gamesResponse struct {
		Response struct {
			Games []utils.GameInfo `json:"games"`
		} `json:"response"`
	}

	if err := json.Unmarshal(body, &gamesResponse); err != nil {
		log.Printf("Failed to parse JSON response: %v", err)
		c.String(http.StatusInternalServerError, "Failed to parse JSON response")
		return nil
	}

	for i := range gamesResponse.Response.Games {
    gamesResponse.Response.Games[i].ImageURL = fmt.Sprintf("https://cdn.akamai.steamstatic.com/steam/apps/%d/header.jpg", gamesResponse.Response.Games[i].AppID)
	}

	return gamesResponse.Response.Games
}
