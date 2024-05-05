package utils

type GameInfo struct {
	AppID     int    `json:"appid"`
	Name      string `json:"name"`
	Playtime  int    `json:"playtime_forever"`
	ImageURL string
}

type GameData struct {
	AppId int `json:"appid"`
	Name string `json:"name"`
	ImageUrl string
	Message string
}

type TopGenreGameInfo struct {
	Name string `json:"name"`
	Genre []GenreInfo
}

type GenreInfo struct {
    Name string `json:"description"`
}
