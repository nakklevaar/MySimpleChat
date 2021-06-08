import { RouteComponentProps } from "react-router";
import IApiService from "types/services/api-service";

import { IChatPage } from "./chats-page";
import { IProfilePage } from "./profile-page";
import { ICurrentUser } from "./user";

export interface IState {
    user: ICurrentUser;
    profilePage: IProfilePage;
    chatsPage: IChatPage;
}

export interface IAction {
    type: string;
    [propName: string]: any;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    isMale: boolean;
    imageSource: string;
}

export interface IRequestable<T> {
    status: StateStatus;
    data: T;
    errors: string[];
}

export type DefaultPropsTuple = RouteComponentProps<{ id: string }> & { apiService: IApiService };

export enum StateStatus {
    "Empty",
    "Requested",
    "Loaded",
    "CompletelyLoaded"
}