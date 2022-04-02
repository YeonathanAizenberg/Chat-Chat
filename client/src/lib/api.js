import axios from "axios";

const BaseURL = "http://localhost:5500/messages"
// const BaseURL = "" // The deployed DB

export async function addNewMessage(messageData) { 
    const {room, user, message, time} = messageData
    const response = await axios.post(`${BaseURL}`, {room, user, message, time});
    return response;
}

export async function getMessages() { 
    const response = await axios.get(`${BaseURL}/`);
    return response;
}