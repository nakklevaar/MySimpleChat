import "./search-list.css";

import { Component } from "react";
import { connect } from "react-redux";
import { getSearchList } from "selectors/chats-page";
import { IRequestable, IState, StateStatus } from "types/state";
import { ISearchTemplate } from "types/state/chats-page";

import BlurredLoading from "../../blurred-loading";
import LightChatPreview from "./light-chat-preview";

interface IProps {
    searchList: ISearchTemplate[];
}

const SearchList = ({ searchList }: IProps) => {
    return (
        <div className="search-list module">
            {searchList.map((chat) => <LightChatPreview chat={chat} key={chat.id} />)}
        </div>
    );
};

interface IContainerProps {
    searchList: IRequestable<ISearchTemplate[]>;
}

class SearchListContainer extends Component<IContainerProps> {
    render() {
        const rootNode = <SearchList searchList={this.props.searchList.data} />;
        const node = this.props.searchList.status === StateStatus.Loaded || this.props.searchList.status === StateStatus.CompletelyLoaded;
        return <div className="chats-list-wrap">
            <BlurredLoading className="blurred" render={rootNode} show={node} />
        </div>;
    }
}

const mapStateToProps = (state: IState) => ({
    searchList: getSearchList(state)
});

export default connect(mapStateToProps)(SearchListContainer);