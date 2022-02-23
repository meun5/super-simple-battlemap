//go:build debug

package main

import (
	"net/http"
	"text/template"
)

var staticFiles http.FileSystem = http.Dir("./static")

func t() (*template.Template, error) {
	return template.ParseFiles("templates/index.html.tmpl")
}

const MODE = "DEBUG"
