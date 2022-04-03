const express = require("express");
const app = express();
const cors = require("cors");

const connection = require('./lib/db');
const dbPort = 5500;
const messageRouter = require('./routes/messages')

const http = require("http");
const socketPort = 3001;
const {Server} = require("socket.io");
const { userLeave, userJoin, getRoomUsers } = require("./utils/users");

app.use(cors());
app.use(express.json());

app.use("/messages", messageRouter)

app.listen(dbPort, ()=> {
    console.log("Server is Running on port " + dbPort)
    connection.connect((error)=> {
        if(error) throw error;
        console.log("DataBase Created!")
    })
})

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

server.listen(socketPort, () => {
    console.log("Socket is Running on port " + socketPort)
})