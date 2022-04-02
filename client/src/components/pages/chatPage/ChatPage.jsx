import React, { useEffect, useState } from "react";
import StandardButton from "../../atoms/standardButton/StandardButton";
import StandardInput from "../../atoms/standardInput/StandardInput";
import ChatPageHeader from "../../organisms/chatPageHeader/ChatPageHeader";
import ChatPageBody from "../../organisms/chatPageBody/ChatPageBody";
import { addNewMessage } from "../../../lib/api";
import './ChatPage.css';

const ChatPage = ({ socket, usersList }) => {

    const [chatMsg, setChatMsg] = useState("")
    const [messageList, setMessageListList] = useState([])
    const getTime = new Date(Date.now())

    const handleMessage = async () => {
        if (chatMsg !== "") {
            const messageData = {
                room: "default",
                user: localStorage.getItem("currentUser"),
                message: chatMsg,
                time: getTime.getHours() + ":" + getTime.getMinutes(),
            }

            await socket.emit("send_message", messageData)
            setMessageListList((list) => [...list, messageData])
            setChatMsg("")
            try {
                addNewMessage(messageData)
            } catch (e) {
                console.log(e)
                alert(e)
            }
            
        } else {
            alert("You need a Message!")
        }
    }

    useEffect(() => {
        socket.on("new_chat_message", (data) => {
            setMessageListList((list) =>
                [...list, data]
            )
        })
    }, [socket])

    return (
        <div className="main-chat-wrapper">
            <ChatPageHeader
                data={usersList}
            />
            <ChatPageBody
                data={messageList}
            />
            <div className="chat-footer">
                <div className="chat-input-wrapper">
                    <StandardInput
                        className={"chat-input"}
                        value={chatMsg}
                        placeholder={"Write in here..."}
                        handleOnchange={setChatMsg}
                        handleEnterKey={handleMessage}
                    />
                </div>

                <div className="chat-btn-wrapper">
                    <StandardButton
                        className={"chat-btn"}
                        text={"Send"}
                        handleOnClick={handleMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;