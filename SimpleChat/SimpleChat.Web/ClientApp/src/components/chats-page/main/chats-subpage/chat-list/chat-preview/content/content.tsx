import "./content.css";

import config from "config";
import { connect } from "react-redux";
import { IState } from "types/state";
import { IChat } from "types/state/chats-page";
import { ICurrentUser } from "types/state/user";
import { normalizeDate } from "utils";

interface IProps {
    chat: IChat;
    user: ICurrentUser;
}

const Content = ({ chat, user }: IProps) => {
    const lastMessage = chat.messages.data[0] || chat.lastMessage;
    const imgUrl = `${config.imagesPath}${user.info.imageSource}`;
    const isRead = !lastMessage.isRead && lastMessage.sender.id === user.info.id ? "unread" : null;
    const photo = lastMessage.sender.id === user.info.id
        ? <img className="chat-last-message__peer-photo" src={imgUrl}></img>
        : null;

    return (
        <div className="chat-item__content">
            <div className="chat-item__title">{chat.name}</div>
            <div className="chat-last-message">
                <div className={`chat-last-message__preview ${isRead}`}>
                    {photo}
                    <div className="chat-last-message__text">{lastMessage.content}</div>
                </div>
                <div className="chat-last-message__info">
                    <span className="chat-last-message__sender-name">
                        {lastMessage.sender.firstName}
                    </span>
                    <span className="chat-last-message__time">
                        {normalizeDate(lastMessage.createDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default connect((state: IState) => ({ user: state.user }))(Content);