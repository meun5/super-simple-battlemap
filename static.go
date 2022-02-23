//go:build !debug

package main

import (
	"embed"
	"html/template"
	"net/http"
)

//go:embed static
var staticFileEmbed embed.FS

//go:embed templates
var indexHTML embed.FS

var staticFiles http.FileSystem = http.FS(staticFileEmbed)

func t() (*template.Template, error) {
	return template.ParseFS(indexHTML, "templates/*.html.tmpl")
}

const MODE = "RELEASE"
