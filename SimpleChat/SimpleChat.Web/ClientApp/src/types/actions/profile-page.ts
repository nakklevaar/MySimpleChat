import { IAction, IUser } from "types/state";

import { IAbout } from "types/state/profile-page";
import { IThunkAction } from ".";
import { String } from "lodash";

// About

export const FETCH_PROFILE_ABOUT_REQUEST = "FETCH_PROFILE_ABOUT_REQUEST";
export const FETCH_PROFILE_ABOUT_SUCCESS = "FETCH_PROFILE_ABOUT_SUCCESS";
export const FETCH_PROFILE_ABOUT_FAILURE = "FETCH_PROFILE_ABOUT_FAILURE";

interface IProfileAboutRequest extends IAction {
    type: typeof FETCH_PROFILE_ABOUT_REQUEST;
}

interface IProfileAboutSuccess extends IAction {
    type: typeof FETCH_PROFILE_ABOUT_SUCCESS;
    data: IAbout;
}

interface IProfileAboutFailure extends IAction {
    type: typeof FETCH_PROFILE_ABOUT_FAILURE;
    errors: string[];
}

export type ProfileAboutActions =
    | IProfileAboutRequest
    | IProfileAboutSuccess
    | IProfileAboutFailure;

// Friends

export const FETCH_PROFILE_FRIENDS_REQUEST = "FETCH_PROFILE_FRIENDS_REQUEST";
export const FETCH_PROFILE_FRIENDS_SUCCESS = "FETCH_PROFILE_FRIENDS_SUCCESS";
export const FETCH_PROFILE_FRIENDS_FAILURE = "FETCH_PROFILE_FRIENDS_FAILURE";

interface IProfileFriendsRequest extends IAction {
    type: typeof FETCH_PROFILE_FRIENDS_REQUEST;
}

interface IProfileFriendsSuccess extends IAction {
    type: typeof FETCH_PROFILE_FRIENDS_SUCCESS;
    users: IUser[];
}

interface IProfileFriendsFailure extends IAction {
    type: typeof FETCH_PROFILE_FRIENDS_FAILURE;
    errors: string[];
}

export type ProfileFriendsActions =
    | IProfileFriendsRequest
    | IProfileFriendsSuccess
    | IProfileFriendsFailure;

// User

export const FETCH_PROFILE_USER_REQUEST = "FETCH_PROFILE_USER_REQUEST";
export const FETCH_PROFILE_USER_SUCCESS = "FETCH_PROFILE_USER_SUCCESS";
export const FETCH_PROFILE_USER_FAILURE = "FETCH_PROFILE_USER_FAILURE";

interface IProfileUserRequest extends IAction {
    type: typeof FETCH_PROFILE_USER_REQUEST;
}

interface IProfileUserSuccess extends IAction {
    type: typeof FETCH_PROFILE_USER_SUCCESS;
    user: IUser;
}

interface IProfileUserFailure extends IAction {
    type: typeof FETCH_PROFILE_USER_FAILURE;
    errors: string[];
}

export type ProfileUserActions =
    | IProfileUserRequest
    | IProfileUserSuccess
    | IProfileUserFailure;

export interface IFetchProfile {
    (id: string): IThunkAction;
}