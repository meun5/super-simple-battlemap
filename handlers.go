package main

import (
	"log"
	"net/http"
)

func handleIndex(w http.ResponseWriter, req *http.Request) {
	t, err := t()
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Add("Content-Type", "text/html")

	// respond with the output of template execution
	t.ExecuteTemplate(w, "index.html.tmpl", struct {
		Title   string
		Version string
		AppName string
	}{Title: "OPE", AppName: ApplicationName, Version: BuildVersion})
}

func handleNewGame(w http.ResponseWriter, req *http.Request) {
	http.Redirect(w, req, "/map", http.StatusFound)
}

func handleJoinGame(w http.ResponseWriter, req *http.Request) {
	http.Redirect(w, req, "/map", http.StatusFound)
}

func handleMap(w http.ResponseWriter, req *http.Request) {
	t, err := t()
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Add("Content-Type", "text/html")

	// respond with the output of template execution
	t.ExecuteTemplate(w, "map.html.tmpl", struct {
		Title   string
		Version string
		AppName string
	}{Title: "OPE", AppName: ApplicationName, Version: BuildVersion})
}
