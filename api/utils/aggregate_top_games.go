package utils

import "sort"

func TopSixGames(games []GameInfo) []GameInfo {
	maxCount := 6
	sort.Slice(games, func(i, j int) bool {
		return games[i].Playtime > games[j].Playtime
	})

	if len(games) > maxCount {
		games = games[:maxCount]
	}

	return games
}
