const express = require("express");
const app = express();
const cors = require("cors");

const connection = require('./lib/db');
const dbPort = 5500;
const messageRouter = require('./routes/messages')

app.use(cors());
app.use(express.json());

app.use("/messages", messageRouter)

app.listen(process.env.PORT || dbPort, ()=> {
    console.log("Server is Running on port " + dbPort)
    connection.connect((error)=> {
        // if(error) throw error;
        console.log("DataBase Created!")
    })
})