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
	fs := http.FileServer(staticFiles)

	// Serve static files
	http.Handle("/static/", logRequestHandler(http.StripPrefix("/static", fs)))

	// Handle all other requests
	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		var path = req.URL.Path
		log.Println("Serving request for path", path)
		w.Header().Add("Content-Type", "text/html")

		// respond with the output of template execution
		t.Execute(w, struct {
			Title    string
			Response string
			Version  string
		}{Title: "OPE", Response: path, Version: BuildVersion})
	})

	log.Println("Listening on :3000...")

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
