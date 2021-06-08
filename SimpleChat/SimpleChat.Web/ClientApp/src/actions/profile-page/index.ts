import {
    FETCH_PROFILE_ABOUT_FAILURE,
    FETCH_PROFILE_ABOUT_REQUEST,
    FETCH_PROFILE_ABOUT_SUCCESS,
    FETCH_PROFILE_FRIENDS_FAILURE,
    FETCH_PROFILE_FRIENDS_REQUEST,
    FETCH_PROFILE_FRIENDS_SUCCESS,
    FETCH_PROFILE_USER_FAILURE,
    FETCH_PROFILE_USER_REQUEST,
    FETCH_PROFILE_USER_SUCCESS,
    IFetchProfile,
    ProfileAboutActions,
    ProfileFriendsActions,
    ProfileUserActions,
} from "types/actions/profile-page";
import IApiService from "types/services/api-service";
import { IAction, IUser } from "types/state";
import { IAbout } from "types/state/profile-page";

// About

const profileAboutRequested = (): ProfileAboutActions => {
    return {
        type: FETCH_PROFILE_ABOUT_REQUEST
    };
};

const profileAboutLoaded = (data: IAbout): ProfileAboutActions => {
    return {
        type: FETCH_PROFILE_ABOUT_SUCCESS,
        data
    };
};

const profileAboutFailed = (errors: string[]): ProfileAboutActions => {
    return {
        type: FETCH_PROFILE_ABOUT_FAILURE,
        errors
    };
};

// Friends

const profileFriendsRequested = (): ProfileFriendsActions => {
    return {
        type: FETCH_PROFILE_FRIENDS_REQUEST
    };
};

const profileFriendsLoaded = (users: IUser[]): ProfileFriendsActions => {
    return {
        type: FETCH_PROFILE_FRIENDS_SUCCESS,
        users
    };
};

const profileFriendsFailed = (errors: string[]): ProfileFriendsActions => {
    return {
        type: FETCH_PROFILE_FRIENDS_FAILURE,
        errors
    };
};

// User

export const profileUserRequested = (): ProfileUserActions => {
    return {
        type: FETCH_PROFILE_USER_REQUEST
    };
};

export const profileUserLoaded = (user: IUser): ProfileUserActions => {
    return {
        type: FETCH_PROFILE_USER_SUCCESS,
        user
    };
};

export const profileUserFailed = (errors: string[]): ProfileUserActions => {
    return {
        type: FETCH_PROFILE_USER_FAILURE,
        errors
    };
};

export const fetchBase =
    <T extends IAction, U>(requested: (id: string) => T, loaded: (data: U) => T, failed: (errors: string[]) => T) =>
        (callApi: (apiService: IApiService, id: string) => Promise<U>) =>
            (apiService: IApiService): IFetchProfile =>
                (id) =>
                    (dispatch) => {
                        dispatch(requested(id));
                        callApi(apiService, id)
                            .then((data) => dispatch(loaded(data)),
                                (error) => dispatch(failed(error)))
                            .catch(() => alert("error"));
                    };

export const fetchProfile = fetchBase(profileAboutRequested, profileAboutLoaded, profileAboutFailed)((apiService, id) => apiService.getProfile(id));
export const fetchFriends = fetchBase(profileFriendsRequested, profileFriendsLoaded, profileFriendsFailed)((apiService, id) => apiService.getFriends(id));
export const fetchUser = fetchBase(profileUserRequested, profileUserLoaded, profileUserFailed)((apiService, id) => apiService.getUser(id));