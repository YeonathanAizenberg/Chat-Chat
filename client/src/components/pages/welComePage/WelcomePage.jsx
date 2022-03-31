import React, { useState } from "react";
import StandardButton from "../../atoms/standardButton/StandardButton";
import StandardInput from "../../atoms/standardInput/StandardInput";
import './WelcomePage.css';

const WelcomePage = ({socket, logIn }) => {

    const [userName, setUserName] = useState("")

    const handleLogin = async() => {
        if(userName !== "" ) {
            localStorage.setItem("currentUser", userName);
            await socket.emit("join_chat", {room:"default", user:userName})
            logIn(true)
        } else {
            alert("You need a name!")
        }
    }

    return (
        <div className="main-page-wrapper">
            <h1> Welcome to Chat-Chat </h1>
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
        </div>
    );
};

export default WelcomePage;