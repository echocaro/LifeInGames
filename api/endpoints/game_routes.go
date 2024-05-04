package endpoints

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type GameInfo struct {
	AppID     int    `json:"appid"`
	Name      string `json:"name"`
	Playtime  int    `json:"playtime_forever"`
	ImageURL string
}

type GameData struct {
	Name string `json:"name"`
	ImageUrl string
	Message string
}

func OwnedGames(c *gin.Context) {
	ownedGames := fetchOwnedGames(c)

	if ownedGames == nil {
		c.String(http.StatusInternalServerError, "Could not find games")
		return
	}

	c.JSON(http.StatusOK, ownedGames)
}

func GamePlayData(c *gin.Context) {
	ownedGames := fetchOwnedGames(c)
	var gameDataList []GameData

	if ownedGames == nil {
		c.String(http.StatusInternalServerError, "Could not find games")
		return
	}

	for _, game := range ownedGames {
		var message string

		if game.Playtime > 0 {
			days := game.Playtime / 1440

			if days > 0 {
				message = fmt.Sprintf("You have played %s for a total of %d days", game.Name, days)
			}
		}

		gameData := GameData{
			Name: game.Name,
			ImageUrl: game.ImageURL,
			Message: message,
		}

		gameDataList = append(gameDataList, gameData)
	}

	c.JSON(http.StatusOK, gameDataList)
}

func GetTopGames(c *gin.Context) {
	ownedGames := fetchOwnedGames(c)
	topGames := topFiveGames(ownedGames)

	c.JSON(http.StatusOK, topGames)
}

func GetTopGenres(c *gin.Context) {
	ownedGames := fetchOwnedGames(c)
	topGames := topFiveGames(ownedGames)

	for _, game := range topGames {
		fetchRawgData(game)
	}
}

func fetchOwnedGames(c *gin.Context) []GameInfo {
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
			Games []GameInfo `json:"games"`
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

func fetchRawgData(game GameInfo) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	formattedName := strings.ToLower(strings.ReplaceAll(game.Name, " ", "-"))
	formattedName = regexp.MustCompile(`[^\w-]`).ReplaceAllString(formattedName, "")

	rawgUrl := fmt.Sprintf("https://api.rawg.io/api/games/%s?key=%s", formattedName, os.Getenv("RAWG_API_KEY"))

	log.Println("what is url: ", rawgUrl)

	response, err := http.Get(rawgUrl)

	log.Println("what is response: ", response)

	if err != nil {
		return
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)

	if err != nil {
		log.Println("error")
	}

	log.Println("what is body: ", string(body))
}

func topFiveGames(games []GameInfo) []GameInfo {
	maxCount := 5
	sort.Slice(games, func(i, j int) bool {
		return games[i].Playtime > games[j].Playtime
	})

	if len(games) > maxCount {
		games = games[:maxCount]
	}

	return games
}
