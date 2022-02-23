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

	var path = req.URL.Path
	log.Println("Serving request for path", path)
	w.Header().Add("Content-Type", "text/html")

	// respond with the output of template execution
	t.Execute(w, struct {
		Title   string
		Version string
		AppName string
	}{Title: "OPE", AppName: ApplicationName, Version: BuildVersion})
}
