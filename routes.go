package main

import "net/http"

func routes() {
	http.HandleFunc("/", handleIndex)
	http.HandleFunc("/new", handleNewGame)
	http.HandleFunc("/join", handleJoinGame)
	http.HandleFunc("/map", handleMap)
}
