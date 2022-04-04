import React, { useEffect, useRef, useState } from "react";
import { getMessages } from "../../../lib/api";
import './ChatPageBody.css';

const ChatPageBody = ({ data, userName }) => {

    const dataWithDBdata = data
    const [loadingDBData, setLoadingDBData] = useState(false)
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [data]);

    useEffect(() => {
        try {
            getMessages().then(response => {
                for (let i = 0; i < response?.data.length; i++) {
                    dataWithDBdata.push(response.data[i])
                }

                setLoadingDBData(true)
            })
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }, []);

    return (
        <>
            {loadingDBData ?
                <div className="chat-body-wrapper" ref={ref}>
                    {dataWithDBdata?.map((user, index) =>
                        <div key={index} className={userName === user.user ? "base-msg sender" : "base-msg receiver"}>

                            <div>
                                {user.message}
                            </div>

                            <div className="person-time-wrapper">
                                <div>
                                    {user.user}
                                </div>
                                <div>
                                    {Number(user.time.split(":")[1]) >=0 && Number(user.time.split(":")[1]) < 10 ? user.time.split(":")[0] + ":"+ "0" + user.time.split(":")[1]: user.time}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                :
                <div className="spinner-container">
                    <div className="loading-spinner">
                    </div>
                </div>
            }
        </>
    );
};

export default ChatPageBody;
