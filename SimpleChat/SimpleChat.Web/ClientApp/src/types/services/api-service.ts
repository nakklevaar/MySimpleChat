import { IChat, IMessage, ISearchTemplate } from "types/state/chats-page";
import { ISendMessage, IUsersMessages } from "types/actions/chats-page";

import { IAbout } from "types/state/profile-page";
import { IUser } from "types/state";

export default interface IApiService {
    getProfile: (id: string) => Promise<IAbout>;

    getFriends: (id: string) => Promise<IUser[]>;

    getUser: (id: string) => Promise<any>;

    getChats: (start: number, count: number) => Promise<IChat[]>;

    getChat: (chatId: number | string) => Promise<IChat>;

    getChatMessages: (id: number, count: number, start: number) => Promise<IUsersMessages>;

    getChatByTemplate: (template: string) => Promise<ISearchTemplate[]>;

    sendMessage: (message: ISendMessage) => Promise<IMessage>;

    markMessagesAsRead: (ids: number[]) => Promise<void>;
}