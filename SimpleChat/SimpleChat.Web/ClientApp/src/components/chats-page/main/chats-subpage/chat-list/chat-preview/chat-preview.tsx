import "./chat-preview.css";

import Content from "./content";
import { IChat } from "types/state/chats-page";
import { Link } from "react-router-dom";
import config from "config";

interface IProps {
    chat: IChat;
    saveY: () => void;
}

const ChatPreview = ({ chat, saveY }: IProps) => {
    const imgUrl = `${config.imagesPath}${chat.imageSource}`;
    const lastMessage = chat.messages.data[0] || chat.lastMessage;
    const isRead = lastMessage.isRead ? null : "not-read";
    return (
        <li className="chats-list__item-wrap" onClick={saveY}>
            <Link to={`/chats/${chat.id}`} className="chat-list__item-link">
                <div className="chats-list__border"></div>
                <div className={`chats-list__item ${isRead}`}>
                    <div className="chat-item">
                        <div className="chat-item__avatar">
                            <img src={imgUrl} alt="" />
                        </div>
                        <Content chat={chat} />
                    </div>
                </div>
            </Link>
        </li>

    );
};

export default ChatPreview;