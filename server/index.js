const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const { userLeave, userJoin, getRoomUsers } = require("./utils/users");

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

    
    socket.on("join_chat", (data)=> {
        const user = userJoin(socket.id, data.user, data.room);
        socket.join(data.room)

        io.to(user.room).emit('update_room_users', {
            users: getRoomUsers(user.room)
        })

        console.log(`User ${data.user} with id ${socket.id}, joined the Chat-Room with name ${data.room}`)
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("new_chat_message", data);
    })

    socket.on("disconnect", () =>  {
        const user = userLeave(socket.id)

        if(user) {
            io.to(user.room).emit('update_room_users', {
                users: getRoomUsers(user.room)
            })
        }

        console.log(`User disconnected ${socket.id}`)
    })
})

server.listen(3001, () => {
    console.log("Show Time!")
})