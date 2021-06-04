import "./input.css";

import { DefaultPropsTuple, IState } from "types/state";
import { Dispatch, bindActionCreators } from "redux";
import { IPostFetchChatMessages, ISendMessage } from "types/actions/chats-page";
import React, { Component } from "react";

import { connect } from "react-redux";
import { getOwnId } from "selectors/chats-page";
import { getUser } from "selectors/profile-page";
import { postFetchChatMessage } from "actions/chats-page";
import { withApiService } from "components/hoc";
import { withRouter } from "react-router-dom";

interface IProps {
    id: number;
    userId: string;
    postFetchChatMessage: IPostFetchChatMessages;
}

class ChatInput extends Component<IProps> {

    state = { value: "" };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.onClick();
        }
    };

    onClick = () => {
        this.setState({ value: "" });
        const message: ISendMessage = {
            chatId: this.props.id,
            content: this.state.value,
            createDate: new Date(Date.now()),
            senderId: this.props.userId
        };
        this.props.postFetchChatMessage(message);
    };

    render() {
        return (
            <div className="current-chat__input-wrap">
                <div className="current-chat__input module">
                    <div className="current-chat__text-area">
                        <input className={`current-chat__text ${this.state.value ? null : "empty"}`}
                            onChange={this.onChange}
                            placeholder={this.state.value || "Write a message..."}
                            value={this.state.value}
                            onKeyUp={this.onKeyUp}>
                        </input>
                    </div>
                    <button className="fas fa-paper-plane current-chat__send-button"
                        onClick={this.onClick}></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    id: +match.params.id,
    userId: getOwnId(state)
});

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({ postFetchChatMessage: postFetchChatMessage(apiService) }, dispatch)
);


export default withRouter(withApiService()(connect(mapStateToProps, mapDispatchToProps)(ChatInput)));