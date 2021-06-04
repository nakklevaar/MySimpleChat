import { IRequestable, IUser } from "types/state";

export interface IChatPage {
    chatList: IRequestable<IChat[]>;
    tempChat: IRequestable<IChat | null>;
    searchList: IRequestable<ISearchTemplate[]>;
}

export interface IDuoChat extends IChatBase {
    peer: IUser;
}

export interface IGroupChat extends IChatBase {
    lastMessage: IMessage;
    peersCount: number;
    creatorId: string;
    peers: IRequestable<IUser[]>;
}

export type IChat = IDuoChat | IGroupChat;

export interface IChatBase {
    id: number;
    chatType: ChatType;
    name: string;
    imageSource: string;
    lastMessage: IMessage;
    messages: IRequestable<IMessage[]>;
}

export enum ChatType {
    "Duo",
    "Group",
}

export interface IMessage {
    id: number;
    content: string;
    createDate: Date;
    sender: IUser;
    isRead: boolean;
    chatId: number;
}

export interface ISearchTemplate {
    id: number;
    name: string;
    imageSource: string;
}