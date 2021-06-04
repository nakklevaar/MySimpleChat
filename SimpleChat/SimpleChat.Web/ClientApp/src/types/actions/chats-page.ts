import { IAction, IState, IUser } from "types/state";
import { IChat, IMessage, ISearchTemplate } from "types/state/chats-page";

import { IThunkAction } from ".";
import { String } from "lodash";
import { ThunkAction } from "redux-thunk";

export const FETCH_CHATS_REQUEST = "FETCH_CHATS_REQUEST";
export const FETCH_CHATS_SUCCESS = "FETCH_CHATS_SUCCESS";
export const FETCH_CHATS_FAILURE = "FETCH_CHATS_FAILURE";

export const FETCH_CHAT_REQUEST = "FETCH_CHAT_REQUEST";
export const FETCH_CHAT_SUCCESS = "FETCH_CHAT_SUCCESS";
export const FETCH_CHAT_FAILURE = "FETCH_CHAT_FAILURE";

export const FETCH_CHAT_MESSAGES_REQUEST = "FETCH_CHAT_MESSAGES_REQUEST";
export const FETCH_CHAT_MESSAGES_SUCCESS = "FETCH_CHAT_MESSAGES_SUCCESS";
export const FETCH_CHAT_MESSAGES_FAILURE = "FETCH_CHAT_MESSAGES_FAILURE";

export const FETCH_CHAT_USERS_REQUEST = "FETCH_CHAT_USERS_REQUEST";
export const FETCH_CHAT_USERS_SUCCESS = "FETCH_CHAT_USERS_SUCCESS";
export const FETCH_CHAT_USERS_FAILURE = "FETCH_CHAT_USERS_FAILURE";

export const FETCH_CHAT_SEARCH_REQUEST = "FETCH_CHAT_PREVIEW_TEMPLATE_REQUEST";
export const FETCH_CHAT_SEARCH_SUCCESS = "FETCH_CHAT_PREVIEW_TEMPLATE_SUCCESS";
export const FETCH_CHAT_SEARCH_FAILURE = "FETCH_CHAT_PREVIEW_TEMPLATE_FAILURE";

export const CLEAR_TEMP_CHAT = "CLEAR_TEMP_CHAT";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";

export const POST_FETCH_CHAT_MESSAGE_REQUEST = "POST_FETCH_CHAT_MESSAGE_REQUEST";
export const POST_FETCH_CHAT_MESSAGE_SUCCESS = "POST_FETCH_CHAT_MESSAGE_SUCCESS";
export const POST_FETCH_CHAT_MESSAGE_FAILURE = "POST_FETCH_CHAT_MESSAGE_FAILURE";

export const POST_MESSAGES_MARK_AS_READ_SUCCESS = "POST_MESSAGES_MARK_AS_READ_SUCCESS";
export const POST_MESSAGES_MARK_AS_READ_FAILURE = "POST_MESSAGES_MARK_AS_READ_FAILURE";

export const CHAT_MESSAGE_RECEIVED = "CHAT_MESSAGE_RECEIVED";
export const MARKED_MESSAGES_RECEIVED = "MARKED_MESSAGES_RECEIVED";

interface FetchChatsRequest extends IAction {
    type: typeof FETCH_CHATS_REQUEST;
}

interface FetchChatsSuccess extends IAction {
    type: typeof FETCH_CHATS_SUCCESS;
    chats: IChat[];
}

interface FetchChatsFailure extends IAction {
    type: typeof FETCH_CHATS_FAILURE;
    errors: string[];
}

export type FetchChatsActions =
    | FetchChatsRequest
    | FetchChatsSuccess
    | FetchChatsFailure;

interface FetchChatRequest extends IAction {
    type: typeof FETCH_CHAT_REQUEST;
}

interface FetchChatSuccess extends IAction {
    type: typeof FETCH_CHAT_SUCCESS;
    chat: IChat;
}

interface FetchChatFailure extends IAction {
    type: typeof FETCH_CHAT_FAILURE;
    errors: string[];
}

export type FetchChatActions =
    | FetchChatRequest
    | FetchChatSuccess
    | FetchChatFailure;

interface FetchChatMessagesRequest extends IAction {
    type: typeof FETCH_CHAT_MESSAGES_REQUEST;
    id: number;
}

interface FetchChatMessagesSuccess extends IAction {
    type: typeof FETCH_CHAT_MESSAGES_SUCCESS;
    data: { peersMessages: IUsersMessages; id: number };
}

interface FetchChatMessagesFailure extends IAction {
    type: typeof FETCH_CHAT_MESSAGES_FAILURE;
    errors: string[];
}

export type FetchChatMessagesActions =
    | FetchChatMessagesRequest
    | FetchChatMessagesSuccess
    | FetchChatMessagesFailure;

interface FetchChatUsersRequest extends IAction {
    type: typeof FETCH_CHAT_USERS_REQUEST;
}

interface FetchChatUsersSuccess extends IAction {
    type: typeof FETCH_CHAT_USERS_SUCCESS;
    chatUsers: IChatUsers;
}

interface FetchChatUsersFailure extends IAction {
    type: typeof FETCH_CHAT_USERS_FAILURE;
    errors: string[];
}

export type FetchChatUsersActions =
    | FetchChatUsersRequest
    | FetchChatUsersSuccess
    | FetchChatUsersFailure;

interface FetchChatSearchRequest extends IAction {
    type: typeof FETCH_CHAT_SEARCH_REQUEST;
}

interface FetchChatSearchSuccess extends IAction {
    type: typeof FETCH_CHAT_SEARCH_SUCCESS;
    chatPreview: ISearchTemplate[];
}

interface FetchChatSearchFailure extends IAction {
    type: typeof FETCH_CHAT_SEARCH_FAILURE;
    errors: string[];
}

export type FetchChatSearchActions =
    | FetchChatSearchRequest
    | FetchChatSearchSuccess
    | FetchChatSearchFailure;



export interface ClearTempChat extends IAction {
    type: typeof CLEAR_TEMP_CHAT;
}

export interface ClearSearchList extends IAction {
    type: typeof CLEAR_SEARCH_LIST;
}

export type AnotherActions =
    | ClearTempChat
    | ClearSearchList;

interface PostFetchChatMessageSuccess extends IAction {
    type: typeof POST_FETCH_CHAT_MESSAGE_SUCCESS;
    message: IMessage;
}

interface PostFetchChatMessageFailure extends IAction {
    type: typeof POST_FETCH_CHAT_MESSAGE_FAILURE;
    errors: string[];
}

interface ChatMessageReceived extends IAction {
    type: typeof CHAT_MESSAGE_RECEIVED;
    message: IMessage;
}

interface PostMarkMessagesAsReadSuccess extends IAction {
    type: typeof POST_MESSAGES_MARK_AS_READ_SUCCESS;
    ids: number[];
    chatId: number;
}

interface PostMarkMessagesAsReadFailure extends IAction {
    type: typeof POST_MESSAGES_MARK_AS_READ_FAILURE;
    errors: string[];
}

interface MarkedMessagesReceived extends IAction {
    type: typeof MARKED_MESSAGES_RECEIVED;
    ids: number[];
    chatId: number;
}

export type PostChatFetching =
    | PostFetchChatMessageSuccess
    | PostFetchChatMessageFailure
    | PostMarkMessagesAsReadSuccess
    | PostMarkMessagesAsReadFailure
    | ChatMessageReceived
    | MarkedMessagesReceived;

export type ChatPageFetching =
    | FetchChatsActions
    | FetchChatActions
    | FetchChatMessagesActions
    | FetchChatUsersActions
    | FetchChatSearchActions
    | PostChatFetching;

export interface IFetchChats {
    (count?: number, start?: number): IThunkAction;
}

export interface IFetchChat {
    (id: number): IThunkAction;
}

export interface IFetchChatSeach {
    (template: string, count?: number, start?: number): IThunkAction;
}

export interface IFetchChatMessages {
    (id: number, count?: number, start?: number): IThunkAction;
}

export interface IPostFetchChatMessages {
    (message: ISendMessage): IThunkAction;
}

export interface IPostMarkMessagesAsRead {
    (ids: number[], chatId: number): IThunkAction;
}

export interface ILightMessage {
    id: number;
    content: string;
    createDate: Date;
    senderId: string;
    isRead: boolean;
    chatId: number;
}

export interface IUsersMessages {
    peers: IUser[];
    messages: ILightMessage[];
}

export interface IChatUsers {
    id: number;
    users: IUser[];
}

export interface ISendMessage {
    content: string;
    createDate: Date;
    senderId: string;
    chatId: number;
}