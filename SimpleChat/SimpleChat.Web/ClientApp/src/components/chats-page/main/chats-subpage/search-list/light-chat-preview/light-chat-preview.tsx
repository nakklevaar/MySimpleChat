import { Link } from "react-router-dom";
import { ISearchTemplate } from "types/state/chats-page";
import "./light-chat-preview.css";
import config from "config";

interface IProps {
    chat: ISearchTemplate;
}

const LightChatPreview = ({ chat }: IProps) => {
    const imgUrl = `${config.imagesPath}${chat.imageSource}`;
    return (
        <li className="search-list__item-wrap">
            <Link to={`/chats/${chat.id}`} className="search-list__item-link">
                <div className="search-list__border"></div>
                <div className="search-list__item">
                    <div className="light-chat-item">
                        <div className="light-chat-item__avatar">
                            <img src={imgUrl} alt="" />
                        </div>
                        <div className="light-chat-item__content">
                            <div className="light-chat-item__title">{chat.name}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default LightChatPreview;
