package endpoints

import (
	externalapi "api/external_api"
	"api/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func OwnedGames(c *gin.Context) {
	ownedGames := externalapi.FetchOwnedGames(c)

	if ownedGames == nil {
		c.String(http.StatusInternalServerError, "Could not find games")
		return
	}

	c.JSON(http.StatusOK, ownedGames)
}

func GamePlayData(c *gin.Context) {
	ownedGames := externalapi.FetchOwnedGames(c)
	var gameDataList []utils.GameData

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

		gameData := utils.GameData{
			Name: game.Name,
			ImageUrl: game.ImageURL,
			Message: message,
		}

		gameDataList = append(gameDataList, gameData)
	}

	c.JSON(http.StatusOK, gameDataList)
}

func GetTopGames(c *gin.Context) {
	ownedGames := externalapi.FetchOwnedGames(c)
	topGames := topFiveGames(ownedGames)

	c.JSON(http.StatusOK, topGames)
}

func GetTopGenres(c *gin.Context) {
	var games []utils.TopGenreGameInfo
	ownedGames := externalapi.FetchOwnedGames(c)
	topGames := topFiveGames(ownedGames)

	if ownedGames == nil {
		c.String(http.StatusInternalServerError, "Could not find games")
		return
	}

	if topGames == nil {
		c.String(http.StatusInternalServerError, "Could not find top games")
		return
	}

	for _, game := range topGames {
		genre, err := fetchGenreData(game)

		if err != nil {
			c.String(http.StatusInternalServerError, "Could not find game genres")
			return
		}

		game := utils.TopGenreGameInfo{
			Name: game.Name,
			Genre: genre,
		}

		games = append(games, game)
	}

	c.JSON(http.StatusOK, games)
}

func fetchGenreData(game utils.GameInfo) ([]utils.GenreInfo, error) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	formattedName := strings.ToLower(strings.ReplaceAll(game.Name, " ", "-"))
	formattedName = regexp.MustCompile(`[^\w-]`).ReplaceAllString(formattedName, "")

	rawgUrl := fmt.Sprintf("https://api.rawg.io/api/games/%s?key=%s", formattedName, os.Getenv("RAWG_API_KEY"))

	response, err := http.Get(rawgUrl)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var genres []utils.GenreInfo
	var rawgResponse struct {
		Genres []utils.GenreInfo `json:"genres"`
	}

	if err := json.NewDecoder(response.Body).Decode(&rawgResponse); err != nil {
		return nil, err
	}

	genres = rawgResponse.Genres
	return genres, nil
}

func topFiveGames(games []utils.GameInfo) []utils.GameInfo {
	maxCount := 5
	sort.Slice(games, func(i, j int) bool {
		return games[i].Playtime > games[j].Playtime
	})

	if len(games) > maxCount {
		games = games[:maxCount]
	}

	return games
}
