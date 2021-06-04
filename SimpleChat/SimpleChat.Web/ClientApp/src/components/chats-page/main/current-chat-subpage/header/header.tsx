import "./header.css";

import { ChatType, IChat, IDuoChat } from "types/state/chats-page";

import { Link } from "react-router-dom";
import config from "config.json";

interface IProps {
    chat: IChat;
}

const ChatHeader = ({ chat }: IProps) => {
    const imgUrl = `${config.imagesPath}${chat.imageSource}`;

    const link = chat.chatType === ChatType.Duo
        ? (chat as IDuoChat).peer.id
        : 1;
    return (
        <div className="current-chat__header module">
            <div className="current-chat__back">
                <Link to="/chats" className="current-chat__back-link">
                    Back
                </Link>
            </div>
            <div className="current-chat__info">
                <div className="current-chat__title">{chat.name}</div>
                <div className="current-chat__meta">last seen two hours ago</div>
            </div>
            <div className="current-chat__aside">
                <Link to={`/profile/${link}`} className="current-chat__profile-link">
                    <div className="current-chat__photo">
                        <img src={imgUrl} alt="" />
                    </div>
                </Link>
                <div className="current-chat__actions"></div>
            </div>
        </div>
    );
};

export default ChatHeader;
