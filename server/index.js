const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: [ "GET", "POST" ],
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    // io.emit("message", "A user has join the chat : )") // Implement "alert"

    socket.on("join_chat", (data)=> {
        socket.join(data.room)

        io.emit("new_user_in_room", data.user);
        console.log(`User ${data.user} with id ${socket.id}, joined the Chat-Room with name ${data.room}`)
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("new_chat_message", data);
    })

    socket.on("disconnect", () =>  {
        // io.emit("message", "A user has left the chat : /") // Implement "alert"
        console.log(`User disconnected ${socket.id}`)
    })
})

server.listen(3001, () => {
    console.log("Show Time!")
})