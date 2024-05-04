package utils

import "sort"

func TopFiveGames(games []GameInfo) []GameInfo {
	maxCount := 5
	sort.Slice(games, func(i, j int) bool {
		return games[i].Playtime > games[j].Playtime
	})

	if len(games) > maxCount {
		games = games[:maxCount]
	}

	return games
}
