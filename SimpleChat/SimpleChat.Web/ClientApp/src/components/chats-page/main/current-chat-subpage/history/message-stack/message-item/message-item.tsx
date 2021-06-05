import "./message-item.css";

import { IMessage } from "types/state/chats-page";

interface IProps {
    message: IMessage;
}

const MessageItem = ({ message }: IProps) => {
    const isRead = message.isRead ? null : "unread";
    return (
        <li className={`message-item ${isRead}`} data-id={message.id} data-sender={message.sender.id}>
            <div className="message-item__text">{message.content}</div>
        </li>
    );
};

export default MessageItem;