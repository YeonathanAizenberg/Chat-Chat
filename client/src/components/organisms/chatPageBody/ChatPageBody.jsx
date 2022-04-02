import React, { useEffect, useRef, useState } from "react";
import { getMessages } from "../../../lib/api";
import './ChatPageBody.css';

const ChatPageBody = ({ data }) => {

    const dataWithDBdata = data
    const [loadingDBData, setLoadingDBData] = useState(false)
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [data]);

    useEffect(() => {
        try{
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
            :
            <div>
                Loading Data..
            </div>
            }
        </>
    );
};

export default ChatPageBody;