//go:build debug

package main

import (
	"net/http"
	"text/template"
)

var staticFiles http.FileSystem = http.Dir("./static")

var t, _ = template.ParseFiles("templates/index.html.tmpl")

const MODE = "DEBUG"
