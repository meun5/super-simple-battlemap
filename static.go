//go:build !debug

package main

import (
	"embed"
	"net/http"
	"text/template"
)

//go:embed static
var staticFileEmbed embed.FS

//go:embed templates
var indexHTML embed.FS

var staticFiles http.FileSystem = http.FS(staticFileEmbed)

func t() (*template.Template, error) {
	return template.ParseFS(indexHTML, "templates/index.html.tmpl")
}

const MODE = "RELEASE"
