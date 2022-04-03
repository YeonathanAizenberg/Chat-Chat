import React, { useContext, useState } from "react";
import { UsersDataContext } from "../../../App";
import StandardButton from "../../atoms/standardButton/StandardButton";
import OnlineOnChatModal from "../../molecules/onlineOnChatModal/OnlineOnChatModal";
import './ChatPageHeader.css';

const ChatPageHeader = () => {

    const usersDataContainer = useContext(UsersDataContext)
    const usersList = usersDataContainer.usersList

    const [displayOnlineModal, setDisplayOnlineModal] = useState(false)

    return (
        <div className="chat-header-wrapper">
            <h3>
                {`We are ${usersList?.length} people on the Chat right now!`}
            </h3>
            <StandardButton
                className={"chat-header-btn"}
                text={"See who is online"}
                handleOnClick={() => setDisplayOnlineModal(true)}
            />

            <OnlineOnChatModal
                show={displayOnlineModal}
                onHide={() => setDisplayOnlineModal(false)}
                data={usersList}
            />
        </div>
    );
};

export default ChatPageHeader;