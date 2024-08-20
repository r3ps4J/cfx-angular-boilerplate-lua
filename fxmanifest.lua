fx_version "cerulean"
games { "gta5", "rdr3" }
lua54 "yes"

description "Basic Angular & Lua boilerplate"
author "r3ps4J"
version "1.0.0"
repository 'https://github.com/r3ps4J/cfx-angular-boilerplate-lua'

client_script "client/**/*.lua"
server_script "server/**/*.lua"

ui_page "web/dist/browser/index.html"

files {
	"web/dist/browser/index.html",
	"web/dist/browser/**/*",
}
