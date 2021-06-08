import { getChatById, getChatList, getTempChat } from "selectors/chats-page";
import {
    AnotherActions,
    CHAT_MESSAGE_RECEIVED,
    ChatPageFetching,
    CLEAR_SEARCH_LIST,
    CLEAR_TEMP_CHAT,
    FETCH_CHAT_FAILURE,
    FETCH_CHAT_MESSAGES_FAILURE,
    FETCH_CHAT_MESSAGES_REQUEST,
    FETCH_CHAT_MESSAGES_SUCCESS,
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SEARCH_FAILURE,
    FETCH_CHAT_SEARCH_REQUEST,
    FETCH_CHAT_SEARCH_SUCCESS,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_USERS_FAILURE,
    FETCH_CHAT_USERS_REQUEST,
    FETCH_CHAT_USERS_SUCCESS,
    FETCH_CHATS_FAILURE,
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    IChatUsers,
    IFetchChat,
    IFetchChatMessages,
    IFetchChats,
    IFetchChatSeach,
    IPostFetchChatMessages,
    IPostMarkMessagesAsRead,
    IUsersMessages,
    MARKED_MESSAGES_RECEIVED,
    POST_FETCH_CHAT_MESSAGE_FAILURE,
    POST_FETCH_CHAT_MESSAGE_SUCCESS,
    POST_MESSAGES_MARK_AS_READ_FAILURE,
    POST_MESSAGES_MARK_AS_READ_SUCCESS,
    PostChatFetching,
} from "types/actions/chats-page";
import IApiService from "types/services/api-service";
import { IRequestable, StateStatus } from "types/state";
import { IChat, IMessage, ISearchTemplate } from "types/state/chats-page";

const chatsRequested = (): ChatPageFetching => {
    return {
        type: FETCH_CHATS_REQUEST
    };
};

const chatsLoaded = (chats: IChat[]): ChatPageFetching => {
    return {
        type: FETCH_CHATS_SUCCESS,
        chats
    };
};

const chatsFailed = (errors: string[]): ChatPageFetching => {
    return {
        type: FETCH_CHATS_FAILURE,
        errors
    };
};

const chatRequested = (): ChatPageFetching => {
    return {
        type: FETCH_CHAT_REQUEST
    };
};

const chatLoaded = (chat: IChat): ChatPageFetching => {
    return {
        type: FETCH_CHAT_SUCCESS,
        chat
    };
};

const chatFailed = (errors: string[]): ChatPageFetching => {
    return {
        type: FETCH_CHAT_FAILURE,
        errors
    };
};

const ChatSearchRequested = (): ChatPageFetching => {
    return {
        type: FETCH_CHAT_SEARCH_REQUEST
    };
};

const ChatSearchLoaded = (chatPreview: ISearchTemplate[]): ChatPageFetching => {
    return {
        type: FETCH_CHAT_SEARCH_SUCCESS,
        chatPreview
    };
};

const ChatSearchFailed = (errors: string[]): ChatPageFetching => {
    return {
        type: FETCH_CHAT_SEARCH_FAILURE,
        errors
    };
};

const chatMessagesRequested = (id: number): ChatPageFetching => {
    return {
        type: FETCH_CHAT_MESSAGES_REQUEST,
        id
    };
};

const chatMessagesLoaded = (peersMessages: IUsersMessages, id: any): ChatPageFetching => {
    return {
        type: FETCH_CHAT_MESSAGES_SUCCESS,
        data: { peersMessages, id }
    };
};

const chatMessagesFailed = (errors: string[]): ChatPageFetching => {
    return {
        type: FETCH_CHAT_MESSAGES_FAILURE,
        errors
    };
};

export const chatUsersRequested = (): ChatPageFetching => {
    return {
        type: FETCH_CHAT_USERS_REQUEST
    };
};

export const chatUsersLoaded = (chatUsers: IChatUsers): ChatPageFetching => {
    return {
        type: FETCH_CHAT_USERS_SUCCESS,
        chatUsers
    };
};

export const chatUsersFailed = (errors: string[]): ChatPageFetching => {
    return {
        type: FETCH_CHAT_USERS_FAILURE,
        errors
    };
};

export const clearTempChat = (): AnotherActions => {
    return {
        type: CLEAR_TEMP_CHAT
    };
};

export const clearSearchList = (): AnotherActions => {
    return {
        type: CLEAR_SEARCH_LIST
    };
};

export const PostFetchChatMessageSuccess = (message: IMessage): PostChatFetching => {
    return {
        type: POST_FETCH_CHAT_MESSAGE_SUCCESS,
        message
    };
};

export const PostFetchChatMessageFailed = (errors: string[]): PostChatFetching => {
    return {
        type: POST_FETCH_CHAT_MESSAGE_FAILURE,
        errors
    };
};

export const PostMarkMessagesAsReadSuccess = (ids: number[], chatId: number): PostChatFetching => {
    return {
        type: POST_MESSAGES_MARK_AS_READ_SUCCESS,
        ids,
        chatId
    };
};

export const PostMarkMessagesAsReadFailure = (errors: string[]): PostChatFetching => {
    return {
        type: POST_MESSAGES_MARK_AS_READ_FAILURE,
        errors
    };
};

export const MarkedMessagesReceived = (ids: number[], chatId: number): PostChatFetching => {
    return {
        type: MARKED_MESSAGES_RECEIVED,
        ids,
        chatId
    };
};

export const ChatMessageReceived = (message: IMessage): PostChatFetching => {
    return {
        type: CHAT_MESSAGE_RECEIVED,
        message
    };
};

export const fetchChats: (apiService: IApiService) => IFetchChats =
    (apiService: IApiService) =>
        (count = 10, start?) =>
            (dispatch, getState) => {
                if (getChatList(getState()).status === StateStatus.CompletelyLoaded) return;
                if (getChatList(getState()).status === StateStatus.Requested) return;

                dispatch(chatsRequested());
                apiService.getChats(count, start || getChatList(getState()).status !== StateStatus.Empty ? getChatList(getState()).data.length : 0)
                    .then((data) => dispatch(chatsLoaded(data)),
                        (error) => dispatch(chatsFailed(error)));
            };

export const fetchChat: (apiService: IApiService) => IFetchChat =
    (apiService) =>
        (id) =>
            (dispatch) => {
                dispatch(chatRequested());
                apiService.getChat(id)
                    .then((data) => dispatch(chatLoaded(data)),
                        (error) => dispatch(chatFailed(error)))
                    .catch(() => alert("error"));
            };

export const fetchChatSearch: (apiService: IApiService) => IFetchChatSeach =
    (apiService) =>
        (template) =>
            (dispatch) => {
                dispatch(ChatSearchRequested());
                apiService.getChatByTemplate(template)
                    .then((data) => dispatch(ChatSearchLoaded(data)),
                        (error) => dispatch(ChatSearchFailed(error)))
                    .catch(() => alert("error"));
            };

export const fetchChatMessages: (apiService: IApiService) => IFetchChatMessages =
    (apiService) =>
        (id, count = 20, start?) =>
            (dispatch, getState) => {
                const messages = getChatById(getState(), id)?.messages || (getTempChat(getState()) as IRequestable<IChat>).data.messages;
                if (messages.status === StateStatus.CompletelyLoaded) return;
                if (messages.status === StateStatus.Requested) return;

                dispatch(chatMessagesRequested(id));
                apiService.getChatMessages(id, count, start || messages.data.length || 0)
                    .then((data) => dispatch(chatMessagesLoaded(data, id)),
                        (error) => dispatch(chatMessagesFailed(error)))
                    .catch((e: any) => alert("error " + e));
            };

export const postFetchChatMessage: (apiService: IApiService) => IPostFetchChatMessages =
    (apiService) =>
        (message) =>
            (dispatch) => {
                apiService.sendMessage(message)
                    .then((data) => dispatch(PostFetchChatMessageSuccess(data)),
                        (error) => dispatch(chatMessagesFailed(error)))
                    .catch((e) => alert(e));
            };

export const postMarkMessagesAsRead: (apiService: IApiService) => IPostMarkMessagesAsRead =
    (apiService) =>
        (ids, chatId) =>
            (dispatch) => {
                apiService.markMessagesAsRead(ids)
                    .then(() => dispatch(PostMarkMessagesAsReadSuccess(ids, chatId)),
                        (error) => dispatch(PostMarkMessagesAsReadFailure(error)))
                    .catch((e) => alert(e));
            };