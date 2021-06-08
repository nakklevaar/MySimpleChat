import "./chat-preview.css";

import config from "config";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOwnId } from "selectors/chats-page";
import { IState } from "types/state";
import { IChat } from "types/state/chats-page";

import Content from "./content";

interface IProps {
    chat: IChat;
    userId: string;
    saveY: () => void;
}

const ChatPreview = ({ chat, saveY, userId }: IProps) => {
    const imgUrl = `${config.imagesPath}${chat.imageSource}`;
    const lastMessage = chat.messages.data[0] || chat.lastMessage;
    const isRead = !lastMessage.isRead && lastMessage.sender.id !== userId ? "unread" : null;
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

const mapStateToProps = (state: IState) => ({
    userId: getOwnId(state)
});

export default connect(mapStateToProps)(ChatPreview);