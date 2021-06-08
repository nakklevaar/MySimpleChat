import _ from "lodash";
import { getChatList, getChatMessages, getSearchList, getTempChat } from "selectors/chats-page";
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
    FETCH_CHATS_FAILURE,
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    ILightMessage,
    MARKED_MESSAGES_RECEIVED,
    POST_FETCH_CHAT_MESSAGE_SUCCESS,
    POST_MESSAGES_MARK_AS_READ_SUCCESS,
} from "types/actions/chats-page";
import { IRequestable, IState, IUser, StateStatus } from "types/state";
import { IChat, IChatPage, IMessage } from "types/state/chats-page";

const initial: IChatPage = {
    chatList: {
        status: StateStatus.Empty,
        data: [],
        errors: []
    },
    tempChat: {
        status: StateStatus.Empty,
        data: null,
        errors: []
    },
    searchList: {
        status: StateStatus.Empty,
        data: [],
        errors: []
    }
};

const updateChatsPage = (state: IState | undefined, action: ChatPageFetching | AnotherActions): IChatPage => {
    if (state === undefined) {
        return initial;
    }

    switch (action.type) {
        case FETCH_CHATS_REQUEST:
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    status: StateStatus.Requested
                }
            };

        case FETCH_CHATS_SUCCESS:
            return {
                ...state.chatsPage,
                chatList: {
                    status: action.chats.length
                        ? StateStatus.Loaded
                        : StateStatus.CompletelyLoaded,
                    data: [...getChatList(state).data, ...action.chats.map(chat => chat.id === getTempChat(state).data?.id
                        ? getTempChat(state)?.data as IChat
                        : ({
                            ...chat,
                            messages: {
                                status: StateStatus.Empty,
                                data: [],
                                errors: []
                            }
                        }))],
                    errors: []
                }
            };

        case FETCH_CHATS_FAILURE:
            return {
                ...state.chatsPage,
                chatList: {
                    status: StateStatus.Loaded,
                    data: getChatList(state).data,
                    errors: action.errors
                }
            };

        case FETCH_CHAT_REQUEST:
            return {
                ...state.chatsPage,
                tempChat: {
                    status: StateStatus.Requested,
                    data: {} as any,
                    errors: []
                }
            };

        case FETCH_CHAT_SUCCESS:
            return {
                ...state.chatsPage,
                tempChat: {
                    status: StateStatus.Loaded,
                    data: {
                        ...action.chat,
                        messages: {
                            status: StateStatus.Empty,
                            data: [],
                            errors: []
                        }
                    },
                    errors: []
                }
            };

        case FETCH_CHAT_FAILURE:
            return {
                ...state.chatsPage,
                tempChat: {
                    status: StateStatus.Loaded,
                    data: {} as any,
                    errors: action.errors
                }
            };

        case FETCH_CHAT_SEARCH_REQUEST:
            return {
                ...state.chatsPage,
                searchList: {
                    ...getSearchList(state),
                    status: StateStatus.Requested
                }
            };

        case FETCH_CHAT_SEARCH_SUCCESS:
            return {
                ...state.chatsPage,
                searchList: {
                    status: StateStatus.Loaded,
                    data: action.chatPreview,
                    errors: []
                }
            };

        case FETCH_CHAT_SEARCH_FAILURE:
            return {
                ...state.chatsPage,
                searchList: {
                    status: StateStatus.Loaded,
                    data: action.chatPreview,
                    errors: []
                }
            };

        case FETCH_CHAT_MESSAGES_REQUEST:
            if (getTempChat(state).status !== StateStatus.Empty) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                ...(getTempChat(state)?.data as IChat).messages,
                                status: StateStatus.Requested
                            }
                        }
                    }
                };
            }
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.id
                        ? chat
                        : {
                            ...chat,
                            messages:
                            {
                                ...chat.messages,
                                status: StateStatus.Requested
                            }
                        }
                    )
                }
            };

        case FETCH_CHAT_MESSAGES_SUCCESS:
            if (getTempChat(state).status !== StateStatus.Empty) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                status: action.data.peersMessages.messages.length
                                    ? StateStatus.Loaded
                                    : StateStatus.CompletelyLoaded,
                                data: [
                                    ...(getTempChat(state)?.data as IChat).messages.data,
                                    ...mapToIMessage(action.data.peersMessages.messages, action.data.peersMessages.peers)
                                ],
                                errors: []
                            }
                        }
                    }
                };
            }
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.data.id
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                status: action.data.peersMessages.messages.length
                                    ? StateStatus.Loaded
                                    : StateStatus.CompletelyLoaded,
                                data: [
                                    ...(getChatMessages(state, chat.id) as IRequestable<IMessage[]>).data,
                                    ...mapToIMessage(action.data.peersMessages.messages, action.data.peersMessages.peers)
                                ],
                                errors: []
                            }
                        }
                    )
                }
            };

        case FETCH_CHAT_MESSAGES_FAILURE:
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id !== action.data.id
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                status: StateStatus.Loaded,
                                data: (getChatMessages(state, chat.id) as IRequestable<IMessage[]>).data,
                                errors: action.errors
                            }
                        }
                    )
                }
            };

        case POST_FETCH_CHAT_MESSAGE_SUCCESS: {
            if (getTempChat(state).status !== StateStatus.Empty) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                ...(getTempChat(state)?.data as IChat).messages,
                                data: [action.message, ...(getTempChat(state)?.data as IChat).messages.data]
                            }
                        }
                    }

                };
            }
            const state1 = {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.message.chatId
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                ...chat.messages,
                                data: [action.message, ...(getChatMessages(state, chat.id) as IRequestable<IMessage[]>).data]
                            }
                        }
                    )
                }
            };
            state1.chatList.data.unshift(_.remove(state1.chatList.data, c => c.id === action.message.chatId)[0]);
            return state1;
        }


        case CHAT_MESSAGE_RECEIVED: {
            if (getTempChat(state).status !== StateStatus.Empty) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                ...(getTempChat(state)?.data as IChat).messages,
                                data: [action.message, ...(getTempChat(state)?.data as IChat).messages.data]
                            }
                        }
                    }

                };
            }
            const state1 = {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.message.chatId
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                ...chat.messages,
                                data: [action.message, ...(getChatMessages(state, chat.id) as IRequestable<IMessage[]>).data]
                            }
                        }
                    )
                }
            };

            state1.chatList.data.unshift(_.remove(state1.chatList.data, c => c.id === action.message.chatId)[0]);
            return state1;
        }

        case POST_MESSAGES_MARK_AS_READ_SUCCESS: {
            if (getTempChat(state).status !== StateStatus.Empty) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                ...(getTempChat(state)?.data as IChat).messages,
                                data: (getTempChat(state)?.data as IChat).messages.data.map(m => action.ids.includes(m.id)
                                    ? { ...m, isRead: true }
                                    : m)
                            }
                        }
                    }

                };
            }
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.chatId
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                ...chat.messages,
                                data: chat.messages.data.map(m => action.ids.includes(m.id)
                                    ? { ...m, isRead: true }
                                    : m)
                            }
                        }
                    )
                }
            };
        }

        case MARKED_MESSAGES_RECEIVED: {
            if (getTempChat(state).status !== StateStatus.Empty && getTempChat(state).data?.id == action.chatId) {
                return {
                    ...state.chatsPage,
                    tempChat: {
                        ...getTempChat(state) as IRequestable<IChat>,
                        data: {
                            ...(getTempChat(state)?.data as IChat),
                            messages: {
                                ...(getTempChat(state)?.data as IChat).messages,
                                data: (getTempChat(state)?.data as IChat).messages.data.map(m => action.ids.includes(m.id)
                                    ? { ...m, isRead: true }
                                    : m)
                            }
                        }
                    }

                };
            }
            return {
                ...state.chatsPage,
                chatList: {
                    ...getChatList(state),
                    data: getChatList(state).data.map(chat => chat.id != action.chatId
                        ? chat
                        : {
                            ...chat,
                            messages: {
                                ...chat.messages,
                                data: chat.messages.data.map(m => action.ids.includes(m.id)
                                    ? { ...m, isRead: true }
                                    : m)
                            }
                        }
                    )
                }
            };
        }

        case CLEAR_TEMP_CHAT: {
            return {
                ...state.chatsPage,
                tempChat: initial.tempChat
            };
        }

        case CLEAR_SEARCH_LIST: {
            return {
                ...state.chatsPage,
                searchList: initial.searchList
            };
        }

        default: return state.chatsPage;
    }
};

export default updateChatsPage;

const mapToIMessage = (messages: ILightMessage[], users: IUser[]): IMessage[] =>
    messages.map(({ senderId, ...rest }) => ({ ...rest, sender: users.find(user => user.id === senderId) as IUser }));