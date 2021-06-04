import "./chats-subpage.css";

import { Dispatch, bindActionCreators } from "redux";
import { IAction, IRequestable, IState, StateStatus } from "types/state";
import { IChat, ISearchTemplate } from "types/state/chats-page";
import React, { Component, ReactChild, ReactNode, useEffect } from "react";
import { getChatList, getSearchList } from "selectors/chats-page";

import BlurredLoading from "../blurred-loading";
import ChatList from "./chat-list";
import ChatPreview from "./chat-list/chat-preview";
import IApiService from "types/services/api-service";
import { IFetchChats } from "types/actions/chats-page";
import Loading from "components/loading";
import SearchBar from "./search-bar";
import SearchList from "./search-list";
import { ThunkAction } from "redux-thunk";
import { connect } from "react-redux";
import { fetchChats } from "actions/chats-page";
import { withApiService } from "components/hoc";

const SubcribeOnScroll = (func: IFetchChats) => {
    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            func();
        }
    };
};

interface IProps {
    List: any;
}

const ChatsSubPage = ({ List }: IProps) => {
    return (
        <div className="chats">
            <SearchBar />
            <List />
            <div className="chats__footer-wrap">
                <div className="chats__footer">All Messages</div>
            </div>
        </div>
    );
};

interface IContaiterProps {
    chatList: IRequestable<IChat[]>;
    fetchChats: IFetchChats;
    searchList: IRequestable<ISearchTemplate[]>;
}

class ChatsSubPageContainer extends Component<IContaiterProps> {
    componentDidMount() {
        if (this.props.chatList.status === StateStatus.Empty) {
            this.props.fetchChats();
        }
        SubcribeOnScroll(this.props.fetchChats);
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    render() {
        if (this.props.searchList.status === StateStatus.Empty) {
            return <ChatsSubPage List={ChatList} />;
        } else {
            return <ChatsSubPage List={SearchList} />;
        }
    }
}

const mapStateToProps = (state: IState) => ({
    chatList: getChatList(state),
    searchList: getSearchList(state)
});

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: { apiService: IApiService }) => (
    bindActionCreators({ fetchChats: fetchChats(apiService) }, dispatch));

export default withApiService()(connect(mapStateToProps, mapDispatchToProps)(ChatsSubPageContainer));
