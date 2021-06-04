import { ChatType, IChat, IDuoChat, IMessage, ISearchTemplate } from "types/state/chats-page";
import { IChatUsers, ISendMessage, IUsersMessages } from "types/actions/chats-page";

import { IAbout } from "types/state/profile-page";
import IApiService from "types/services/api-service";
import { IAuthService } from "types/services/auth-service";
import { IUser } from "types/state";
import { loadUserAuthDetails } from "actions/user";
import { monthNames } from "utils";
import store from "store";

export default class ApiService implements IApiService {
    private readonly _baseUrl = "https://localhost:5001";

    private readonly _authService: IAuthService;

    constructor(authService: IAuthService) {
        this._authService = authService;
    }

    private getResource = async (resource: string, init?: RequestInit): Promise<any> => {
        const sendRequest = () =>
            fetch(`${this._baseUrl}${resource}`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + store.getState().user.authDetails.access_token
                },
                credentials: "omit",
                ...init
            });

        let response = await sendRequest();

        if (response.status == 401) {
            const user = await this._authService.signinOrRedirect();
            store.dispatch(loadUserAuthDetails(user));
            response = await sendRequest();
        }
        if (response.status == 204) {
            return;
        }
        return response.json();
    };

    public getProfile = async (id: string): Promise<IAbout> => {
        const profileData = await this.getResource(`/api/profile/${id}`);
        const date = new Date(profileData.birthday);
        profileData.birthday = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
        return profileData;
    };

    public getFriends = (id: string): Promise<IUser[]> => this.getResource(`/api/friends?user_id=${id}`);

    public getUser = (id: string): Promise<any> => this.getResource(`/api/users/${id}`);

    public getChats = async (count: number, start: number): Promise<IChat[]> => {
        const chats: IChat[] = await this.getResource(`/api/chats?start=${start}&count=${count}`);
        chats.forEach(chat => {
            switch (chat.chatType) {
                case ChatType.Duo: {
                    chat.name = `${(chat as IDuoChat).peer.firstName} ${(chat as IDuoChat).peer.lastName}`;
                    chat.imageSource = (chat as IDuoChat).peer.imageSource;
                    break;
                }

                case ChatType.Group: {
                    chat.name = chat.name || "Group";
                    chat.imageSource = chat.imageSource || "default.jpg";
                    break;
                }
            }
        });
        return chats;
    };

    public getChat = async (chatId: number | string): Promise<IChat> => {
        const chat: IChat = await this.getResource(`/api/chats/${chatId}`);
        switch (chat.chatType) {
            case ChatType.Duo: {
                chat.name = `${(chat as IDuoChat).peer.firstName} ${(chat as IDuoChat).peer.lastName}`;
                chat.imageSource = (chat as IDuoChat).peer.imageSource;
                break;
            }

            case ChatType.Group: {
                chat.name = chat.name || "Group";
                chat.imageSource = chat.imageSource || "default.jpg";
                break;
            }
        }
        return chat;
    };

    public getChatMessages = (id: number, count: number, start: number): Promise<IUsersMessages> =>
        this.getResource(`/api/messages?chat_id=${id}&start=${start}&count=${count}`);

    public getChatByTemplate = (template: string): Promise<ISearchTemplate[]> =>
        this.getResource(`/api/chats?template=${template}`);

    public sendMessage = (message: ISendMessage): Promise<IMessage> =>
        this.getResource("/api/messages", {
            method: "POST",
            body: JSON.stringify(message)
        });

    public markMessagesAsRead = (ids: number[]): Promise<void> =>
        this.getResource(`/api/messages?ids=${ids}`, {
            method: "PATCH",
            body: JSON.stringify(ids)
        });
}
