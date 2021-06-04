import "./header.css";

import Navbar from "./navbar";

const ChatsPageHeader = () => {
    return (
        <div className="chats-header">
            <div className="chats-header__title">Chats</div>
            <Navbar />
            <div className="ch-padding-fix"></div>
        </div>
    );
};

export default ChatsPageHeader;
