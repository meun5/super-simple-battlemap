package main

import "net/http"

func routes() {
	// Handle all other requests
	http.HandleFunc("/", handleIndex)
}
