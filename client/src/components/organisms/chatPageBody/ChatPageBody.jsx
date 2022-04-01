import React, { useEffect, useRef } from "react";
import './ChatPageBody.css';

const ChatPageBody = ({ data }) => {

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [data]);

    return (
        <div className="chat-body-wrapper" ref={ref}>
            {data?.map((user, index) =>
                <div key={index} className={localStorage.getItem("currentUser") === user.user ? "base-msg sender" : "base-msg receiver"}>

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