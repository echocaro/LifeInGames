package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
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

func CalcTopGenres(genresList []TopGenreGameInfo) [] string {
	genreCount := make(map[string]int)

    for _, gameGenre := range genresList {
        for _, genre := range gameGenre.Genre {
            genreCount[genre.Name]++
        }
    }

    type genreCountPair struct {
        Genre string
        Count int
    }
    var counts []genreCountPair
    for genre, count := range genreCount {
        counts = append(counts, genreCountPair{Genre: genre, Count: count})
    }

    sort.Slice(counts, func(i, j int) bool {
        return counts[i].Count > counts[j].Count
    })

    topGenres := make([]string, 0, 5)
    existingGenres := make(map[string]bool)

    for _, count := range counts {
        if !existingGenres[count.Genre] && len(topGenres) < 5 {
            topGenres = append(topGenres, count.Genre)
            existingGenres[count.Genre] = true
        }
    }

    return topGenres
}
