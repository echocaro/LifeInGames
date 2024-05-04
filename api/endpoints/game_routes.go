package endpoints

import (
	externalapi "api/external_api"
	"api/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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
	topGames := utils.TopFiveGames(ownedGames)

	c.JSON(http.StatusOK, topGames)
}

func GetTopGenres(c *gin.Context) {
	var games []utils.TopGenreGameInfo
	var topGenres []string
	ownedGames := externalapi.FetchOwnedGames(c)
	topGames := utils.TopFiveGames(ownedGames)

	if ownedGames == nil {
		c.String(http.StatusInternalServerError, "Could not find games")
		return
	}

	if topGames == nil {
		c.String(http.StatusInternalServerError, "Could not find top games")
		return
	}

	for _, game := range topGames {
		genre, err := utils.FetchGenreData(game)

		if err != nil {
			c.String(http.StatusInternalServerError, "Could not find game genres")
			return
		}

		game := utils.TopGenreGameInfo{
			Name: game.Name,
			Genre: genre,
		}

		games = append(games, game)

		topGenres = utils.CalcTopGenres(games)
	}

	c.JSON(http.StatusOK, topGenres)
}
