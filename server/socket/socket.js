import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://s51-john-discuter.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

const onlineUsers = {};
const getSocketId = (userId) => onlineUsers[userId];

io.on("connection", (socket) => {
  console.log("user socket id", socket.id);
  const userID = socket.handshake.query.userID;
  if (userID) {
    onlineUsers[userID] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  }
  socket.on("disconnect", () => {
    console.log("user disconnected", userID);
    delete onlineUsers[userID];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

export { app, io, server, getSocketId };
