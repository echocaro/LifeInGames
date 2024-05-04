package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/joho/godotenv"
)

func FetchGenreData(game GameInfo) ([]GenreInfo, error) {
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

	var genres []GenreInfo
	var rawgResponse struct {
		Genres []GenreInfo `json:"genres"`
	}

	if err := json.NewDecoder(response.Body).Decode(&rawgResponse); err != nil {
		return nil, err
	}

	genres = rawgResponse.Genres
	return genres, nil
}
