//go:build debug

package main

import (
	"html/template"
	"net/http"
)

var staticFiles http.FileSystem = http.Dir("./static")

func t() (*template.Template, error) {
	return template.ParseGlob("templates/*.html.tmpl")
}

const MODE = "DEBUG"
