import { IRequestable, IState } from "types/state";

export const getChatList = (state: IState) => state.chatsPage.chatList;

export const getChatById = (state: IState, id: number) => getChatList(state).data.find(chat => chat.id === id);

export const getOwnId = (state: IState) => state.user.info.id;

export const getChatMessages = (state: IState, id: number) => getChatById(state, id)?.messages;

export const getTempChat = (state: IState) => state.chatsPage.tempChat;

export const getSearchList = (state: IState) => state.chatsPage.searchList;