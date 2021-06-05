import "./history.css";

import { Component, PureComponent } from "react";
import { DefaultPropsTuple, IRequestable, IState, StateStatus } from "types/state";
import { Dispatch, bindActionCreators } from "redux";
import { IChat, IMessage } from "types/state/chats-page";
import { IFetchChatMessages, IPostMarkMessagesAsRead } from "types/actions/chats-page";
import { fetchChatMessages, postMarkMessagesAsRead } from "actions/chats-page";
import { getChatMessages, getOwnId, getTempChat } from "selectors/chats-page";

import Loading from "components/loading";
import MessageStack from "./message-stack";
import { connect } from "react-redux";
import { withApiService } from "components/hoc";
import { withRouter } from "react-router";

let count = 0;
let h = 0;
let lock = true;
let unRead: number[] = [];
let y = 0;

const scrollBottom = (command?: (ids: number[]) => void, userId?: string) => {
    setTimeout(() => {
        const height = document.getElementsByClassName("chat-history")[0].clientHeight;
        window.scrollTo(0, height); h = height; y = window.scrollY;
        if (command && userId) {
            fillArrayUnreaded(command, userId);
        }
    }, 70);
};

const scrollToPrevios = () => {
    setTimeout(() => {
        const height = document.getElementsByClassName("chat-history")[0].clientHeight;
        window.scrollTo(0, height - h);
        h = height;
        y = window.scrollY;
    }, 50);
};

const SubcribeOnScroll = (fetchMessages: () => void, sendCommand: (ids: number[]) => void, id: number, userId: string) => {
    window.onscroll = () => {
        if (window.scrollY === 0) {
            fetchMessages();
        }

        if (lock && y - 100 >= window.scrollY) {
            y = window.scrollY;
            lock = false;
            fillArrayUnreaded(sendCommand, userId);
            setTimeout(() => lock = true, 500);
        }
    };
};

const fillArrayUnreaded = (sendCommand: (ids: number[]) => void, userId: string) => {
    setTimeout(() => {
        for (let i = 0; i < count; i++) {
            const mes = document.getElementsByClassName("message-item")[i] as HTMLElement;
            if (mes.offsetTop >= window.scrollY - 30 && mes.className.includes("unread") && mes.getAttribute("data-sender") != userId) {
                unRead.push(+(mes.getAttribute("data-id") as string));
            }
        }
        const height = document.getElementsByClassName("chat-history")[0].clientHeight;
        h = height;
        if (unRead.length != 0) {
            sendCommand(unRead);
            unRead = [];
        }
    }, 50);
};

const filterMessages = (messages: IMessage[]) => {
    const messagesStackList = [];
    for (let i = 0; i < messages.length; i++) {
        const messagesArr = [];
        messagesArr.push(messages[i]);
        while (i < messages.length - 1 && messages[i].sender.id === messages[i + 1].sender.id) {
            messagesArr.unshift(messages[i + 1]);
            i++;
        }
        const messagesStackItem = <MessageStack messages={messagesArr} key={messagesArr[0].id} />;
        messagesStackList.push(messagesStackItem);
    }

    return messagesStackList;
};

interface IProps {
    messages: IMessage[];
}

class History extends PureComponent<IProps> {
    render() {
        return (
            <div className="chat-history module">
                <div className="chat-history__fix-line"></div>
                <div className="chat-history__inner-container">
                    {filterMessages(this.props.messages)}
                </div>
            </div>
        );
    }
}

interface IContainerProps {
    messages: IRequestable<IMessage[]>;
    id: string;
    userId: string;
    fetchChatMessages: IFetchChatMessages;
    postMarkMessagesAsRead: IPostMarkMessagesAsRead;
}

class HistoryContainer extends Component<IContainerProps> {
    componentDidMount() {
        if (this.props.messages.status === StateStatus.Empty) {
            this.props.fetchChatMessages(+this.props.id);
        }
        SubcribeOnScroll(() => this.props.fetchChatMessages(+this.props.id),
            (ids: number[]) => this.props.postMarkMessagesAsRead(ids, +this.props.id),
            +this.props.id, this.props.userId);

        count = this.props.messages.data.length;
        scrollBottom((ids: number[]) => this.props.postMarkMessagesAsRead(ids, +this.props.id), this.props.userId);
    }

    componentDidUpdate(prevProps: IContainerProps) {
        if (this.props.messages.data.length - prevProps.messages.data.length == 1 || prevProps.messages.data.length === 0) {
            scrollBottom();
        }
        else if (this.props.messages.data.length - prevProps.messages.data.length !== 0)
            scrollToPrevios();

        count = this.props.messages.data.length;
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    render() {
        const loading = this.props.messages.status === StateStatus.Loaded || this.props.messages.status === StateStatus.CompletelyLoaded
            ? null
            : <div className="chats-loading-box">
                <div className="cssloader-blured-outer">
                    <Loading className="blurred" />
                </div>
            </div>;

        return <div className="chat-history-wrap">
            <History messages={this.props.messages.data} />
            {loading}
        </div>;
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    messages: getChatMessages(state, +match.params.id) as IRequestable<IMessage[]> || (getTempChat(state)?.data as IChat).messages,
    userId: getOwnId(state),
    id: match.params.id
});

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({ fetchChatMessages: fetchChatMessages(apiService), postMarkMessagesAsRead: postMarkMessagesAsRead(apiService) }, dispatch));

export default withRouter(
    withApiService()(connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)));