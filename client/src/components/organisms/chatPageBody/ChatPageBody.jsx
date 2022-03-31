import React from "react";
import ScrollToBottom from "react-scroll-to-bottom"
import './ChatPageBody.css';

const ChatPageBody = ({ data }) => {

    return (
        <div className="chat-body-wrapper">
            {data?.map((user, index) =>
                <div key={index} className={localStorage.getItem("currentUser") === user.user ? "sender" : "receiver"}>

                    <div>
                        {user.message}
                    </div>

                    <div className="person-time-wrapper">
                        <div>
                            {user.user}
                        </div>
                        <div>
                            {user.time}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ChatPageBody;