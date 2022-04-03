import React, { useContext } from "react";
import { UsersDataContext } from "../../../App";
import StandardButton from "../../atoms/standardButton/StandardButton";
import StandardInput from "../../atoms/standardInput/StandardInput";
import './WelcomePage.css';

const WelcomePage = ({setUserName, logIn}) => {

    const usersDataContainer = useContext(UsersDataContext)
    const socket = usersDataContainer.socket
    const userName = usersDataContainer.userName

    const handleLogin = async() => {
        if(userName !== "" ) {
            await socket.emit("join_chat", {room:"default", user:userName})
            logIn(true)
        } else {
            alert("You need a name!")
        }
    }

    return (
        <div className="main-page-wrapper">
            <h1> Chat-Chat </h1>
            <div>
                <StandardInput
                    placeholder={"Please insert your name..." }
                    handleOnchange={setUserName}
                    handleEnterKey={handleLogin}
                />

                <StandardButton
                    text={"Login"}
                    handleOnClick={handleLogin}
                />
            </div>
            <div className="main-page-img-wrapper">
                <img 
                    className="rotate_01"
                    src="logo192.png" 
                    alt="chat-chat-logo" 
                    width="50%" 
                    height="100%"
                />
            </div>
        </div>
    );
};

export default WelcomePage;