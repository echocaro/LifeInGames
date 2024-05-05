package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strconv"

	"github.com/joho/godotenv"
)

func FetchGenreData(gameId int) ([]GenreInfo, error) {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	rawgUrl := fmt.Sprintf("https://store.steampowered.com/api/appdetails/?appids=%s&filters=genres", strconv.Itoa(gameId))

	response, err := http.Get(rawgUrl)

	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var genres []GenreInfo
	var steamResponse map[string]struct {
        Success bool `json:"success"`
        Data    struct {
            Genres []GenreInfo `json:"genres"`
        } `json:"data"`
    }


	if err := json.NewDecoder(response.Body).Decode(&steamResponse); err != nil {
        log.Println("error decoding response:", err)
        return nil, err
    }

    // Check if the request was successful
    if !steamResponse[strconv.Itoa(gameId)].Success {
        log.Println("request failed")
        return nil, errors.New("request failed")
    }

    genres = steamResponse[strconv.Itoa(gameId)].Data.Genres

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
