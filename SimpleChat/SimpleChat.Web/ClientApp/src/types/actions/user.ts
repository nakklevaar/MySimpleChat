import { User } from "oidc-client";
import { IAction, IUser } from "types/state";

import { IThunkAction } from ".";

export const USER_AUTH_DETAILS_SUCCESS = "USER_AUTH_DETAILS_SUCCESS";
export const USER_INFO_LOADED = "USER_INFO_LOADED";

interface FetchUserAuthDetails extends IAction {
    type: typeof USER_AUTH_DETAILS_SUCCESS;
    user: User;
}

interface FetchUserInfo extends IAction {
    type: typeof USER_INFO_LOADED;
    user: IUser;
}

export type UserAuthActions =
    | FetchUserAuthDetails
    | FetchUserInfo;

export interface ILoadUser {
    (user: User): IThunkAction;
}