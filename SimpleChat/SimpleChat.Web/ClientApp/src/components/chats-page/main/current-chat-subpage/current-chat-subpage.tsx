import "./current-chat-subpage.css";

import { clearTempChat, fetchChat, fetchChats } from "actions/chats-page";
import { withApiService } from "components/hoc";
import Loading from "components/loading";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { getChatById, getChatList, getTempChat } from "selectors/chats-page";
import { DispatchAction } from "types/actions";
import { IFetchChat, IFetchChats } from "types/actions/chats-page";
import { DefaultPropsTuple, IRequestable, IState, StateStatus } from "types/state";
import { IChat } from "types/state/chats-page";

import ChatHeader from "./header";
import ChatHistory from "./history";
import ChatInput from "./input";

type IProps = {
    chat: IChat;
};


const CurrentChatSubPage = ({ chat }: IProps) => {
    return (
        <div className="current-chat">
            <ChatHeader chat={chat} />
            <ChatHistory />
            <ChatInput />
        </div >
    );
};

interface IContainerProps {
    tempChat: IRequestable<IChat>;
    chatList: IRequestable<IChat[]>;
    chat: IChat | undefined;
    id: string;
    fetchChats: IFetchChats;
    fetchChat: IFetchChat;
    clearTempChat: DispatchAction;
}

class CurrentChatSubPageContainer extends Component<IContainerProps> {

    useTemp = false;

    constructor(props: IContainerProps) {
        super(props);
        if (!this.props.chat) {
            this.useTemp = true;
            this.props.fetchChat(+this.props.id);
        }
    }

    componentWillUnmount() {
        this.useTemp && this.props.clearTempChat();
    }

    render() {
        if (this.useTemp) {
            return this.props.tempChat.status === StateStatus.Loaded
                ? <CurrentChatSubPage chat={this.props.tempChat.data as IChat} />
                : <Loading />;
        }
        return this.props.chatList.status === StateStatus.Loaded || this.props.chatList.status === StateStatus.CompletelyLoaded
            ? <CurrentChatSubPage chat={this.props.chat as IChat} />
            : <Loading />;
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    tempChat: getTempChat(state) as IRequestable<IChat>,
    chatList: getChatList(state),
    chat: getChatById(state, +match.params.id),
    id: match.params.id
});

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({
        fetchChats: fetchChats(apiService),
        fetchChat: fetchChat(apiService),
        clearTempChat
    }, dispatch));

export default withRouter(
    withApiService()(connect(mapStateToProps, mapDispatchToProps)(CurrentChatSubPageContainer))
);
