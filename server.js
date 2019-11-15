const express = require("express")
const server = express()
const routes = require("./server/route.js")

server.use(express.json())
server.use("/api", routes)

module.exports = server