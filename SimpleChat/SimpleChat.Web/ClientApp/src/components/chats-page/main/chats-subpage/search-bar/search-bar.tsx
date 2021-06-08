import "./search-bar.css";

import { clearSearchList, fetchChatSearch } from "actions/chats-page";
import { withApiService } from "components/hoc";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IFetchChatSeach } from "types/actions/chats-page";
import IApiService from "types/services/api-service";

interface IProps {
    fetchChatSearch: IFetchChatSeach;
    clearSearchList: () => void;
}

interface IState {
    value: string;
}

class SearchBar extends Component<IProps, IState> {

    state = { value: "" };

    componentDidUpdate() {
        this.state.value
            ? this.props.fetchChatSearch(this.state.value)
            : this.props.clearSearchList();
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    onClick = () => {
        this.setState({ value: "" });
    };

    render() {
        return (
            <div className="chats-search-bar">
                <i className="fas fa-search chats-search-bar__icon"></i>
                <input className={`chats-search-bar__input ${this.state.value ? null : "empty"}`}
                    onChange={this.onChange}
                    placeholder={this.state.value || "Search"}
                    value={this.state.value}>
                </input>
                <button className="fas fa-times chats-search-bar__clear-button" onClick={this.onClick}></button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: { apiService: IApiService }) => (
    bindActionCreators({ fetchChatSearch: fetchChatSearch(apiService), clearSearchList }, dispatch));

export default withApiService()(connect(undefined, mapDispatchToProps)(SearchBar));