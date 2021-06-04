import "./message-stack.css";

import { IMessage } from "types/state/chats-page";
import { Link } from "react-router-dom";
import MessageItem from "./message-item";
import config from "config.json";
import { normalizeDate } from "utils";

interface IProps {
    messages: IMessage[];
}

const MessageStack = ({ messages }: IProps) => {
    const sender = messages[0].sender;
    const imgUrl = `${config.imagesPath}${sender.imageSource}`;
    return (
        <div className="messages-stack">
            <div className="messages-stack__photo">
                <img src={imgUrl} />
            </div>
            <div className="messages-stack__content">
                <div className="messages-stack__info">
                    <div className="messages-stack__sender-name">
                        <Link className="messages-stack__link" to={`/profile/${sender.id}/about`}>
                            {`${sender.firstName} ${sender.lastName}`}
                        </Link>{" "}
                    </div>
                    <span className="messages-stack__date">{normalizeDate(messages[0].createDate)}</span>
                </div>
                <ul className="messages-stack__list">
                    {messages.map((message) => (
                        <MessageItem message={message} key={message.id} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MessageStack;