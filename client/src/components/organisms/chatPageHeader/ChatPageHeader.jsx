import React, { useState } from "react";
import StandardButton from "../../atoms/standardButton/StandardButton";
import OnlineOnChatModal from "../../molecules/onlineOnChatModal/OnlineOnChatModal";
import './ChatPageHeader.css';

const ChatPageHeader = ({data}) => {

    const [displayOnlineModal, setDisplayOnlineModal] = useState(false)

    return (
        <div className="chat-header-wrapper">
            <h3>
                {`We are ${data?.length} people on the Chat right now!`}
            </h3>
            <StandardButton
                className={"chat-header-btn"}
                text={"See who is online"}
                handleOnClick={() => setDisplayOnlineModal(true)}
            />

            <OnlineOnChatModal
                show={displayOnlineModal}
                onHide={() => setDisplayOnlineModal(false)}
                data={data}
            />
        </div>
    );
};

export default ChatPageHeader;