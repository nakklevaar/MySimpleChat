import "./chat-list.css";

import { IRequestable, IState, StateStatus } from "types/state";

import BlurredLoading from "../../blurred-loading";
import ChatPreview from "./chat-preview";
import { Component } from "react";
import { IChat } from "types/state/chats-page";
import { connect } from "react-redux";
import { getChatList } from "selectors/chats-page";

let y = 0;

interface IProps {
    chatList: IChat[];
}

class ChatList extends Component<IProps> {
    componentDidMount() {
        window.scrollTo(0, y);
    }

    render() {
        return (
            <ul className="chats-list module">
                {this.props.chatList.map(chat => (
                    <ChatPreview chat={chat} key={chat.id} saveY={() => y = window.scrollY} />
                ))}
            </ul>
        );
    }
}


interface IContainerProps {
    chatList: IRequestable<IChat[]>;
}

class ChatListContainer extends Component<IContainerProps> {
    render() {
        const rootNode = <ChatList chatList={this.props.chatList.data} />;
        const node = this.props.chatList.status === StateStatus.Loaded || this.props.chatList.status === StateStatus.CompletelyLoaded;
        return <div className="chats-list-wrap">
            <BlurredLoading className="blurred" render={rootNode} show={node} />
        </div>;
    }
}

const mapStateToProps = (state: IState) => ({
    chatList: getChatList(state)
});

export default connect(mapStateToProps)(ChatListContainer);