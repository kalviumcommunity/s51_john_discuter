import http from "http"
import {Server} from "socket.io"
import express from "express"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
})

io.on("connection", (socket) => {
    console.log("user socket id", socket.id)
    const userID = socket.handshake.query.userID
    console.log(userID)
})

export {app, io, server}