package main

import (
	"log"
	"net/http"
)

var (
	ApplicationName string
	BuildVersion    string
)

func logRequestHandler(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(w, r)

		uri := r.URL.String()
		method := r.Method

		log.Printf("%+v %+v", method, uri)
	}

	return http.HandlerFunc(fn)
}

func main() {
	log.Printf("STARTING IN %s", MODE)

	fs := http.FileServer(staticFiles)

	// Serve static files
	http.Handle("/static/", logRequestHandler(http.StripPrefix("/static", fs)))

	routes()

	log.Println("Listening on :3000...")

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
