import * as signalR from "@microsoft/signalr";

import { ChatMessageReceived, MarkedMessagesReceived } from "actions/chats-page";

import { Dispatch } from "redux";
import { IMessage } from "types/state/chats-page";

export default class SignalRService {
    private hubConnection: signalR.HubConnection;
    private dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chathub")
            .build();
        this.dispatch = dispatch;
        this.hubConnection.on("Receive", this.ReceiveMessage);
        this.hubConnection.on("MarkMessages", this.MarkMessages);
        this.hubConnection.start();
    }

    private ReceiveMessage = (message: IMessage): void => {
        this.dispatch(ChatMessageReceived(message));
    };

    private MarkMessages = (ids: number[], chatId: number) => {
        this.dispatch(MarkedMessagesReceived(ids, chatId));
    };
}