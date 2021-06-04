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
    ProfileAboutActions,
    ProfileFriendsActions,
    ProfileUserActions
} from "types/actions/profile-page";
import { IAction, IState, StateStatus } from "types/state";
import { getAbout, getFriends, getUser } from "selectors/profile-page";

import { IProfilePage } from "types/state/profile-page";

const initial: IProfilePage = {
    about: {
        status: StateStatus.Empty,
        data: {} as any,
        errors: []
    },
    friends: {
        status: StateStatus.Empty,
        data: [],
        errors: []
    },
    user: {
        status: StateStatus.Empty,
        data: {} as any,
        errors: []
    }
};

const updateProfilePage = (state: IState | undefined, action: IAction): IProfilePage => {
    if (state === undefined) {
        return initial;
    }

    switch (action.type) {
        case FETCH_PROFILE_ABOUT_REQUEST:
            return {
                ...state.profilePage,
                about: {
                    ...getAbout(state),
                    status: StateStatus.Requested
                }
            };

        case FETCH_PROFILE_ABOUT_SUCCESS:
            return {
                ...state.profilePage,
                about: {
                    status: StateStatus.Loaded,
                    data: (action as ProfileAboutActions).data,
                    errors: []
                }
            };

        case FETCH_PROFILE_ABOUT_FAILURE:
            return {
                ...state.profilePage,
                about: {
                    status: StateStatus.Loaded,
                    data: getAbout(state).data,
                    errors: (action as ProfileAboutActions).errors
                }
            };

        case FETCH_PROFILE_USER_REQUEST:
            return {
                ...state.profilePage,
                user: {
                    ...getUser(state),
                    status: StateStatus.Requested
                }
            };

        case FETCH_PROFILE_USER_SUCCESS: {
            return {
                ...state.profilePage,
                user: {
                    status: StateStatus.Loaded,
                    data: (action as ProfileUserActions).user,
                    errors: []
                }
            };
        }

        case FETCH_PROFILE_USER_FAILURE:
            return {
                ...state.profilePage,
                user: {
                    status: StateStatus.Loaded,
                    data: getUser(state).data,
                    errors: (action as ProfileUserActions).errors
                }
            };

        case FETCH_PROFILE_FRIENDS_REQUEST:
            return {
                ...state.profilePage,
                friends: {
                    ...getFriends(state),
                    status: StateStatus.Requested
                }
            };

        case FETCH_PROFILE_FRIENDS_SUCCESS: {
            return {
                ...state.profilePage,
                friends: {
                    status: StateStatus.Loaded,
                    data: (action as ProfileFriendsActions).users,
                    errors: []
                }
            };
        }

        case FETCH_PROFILE_FRIENDS_FAILURE:
            return {
                ...state.profilePage,
                friends: {
                    status: StateStatus.Loaded,
                    data: getFriends(state).data,
                    errors: (action as ProfileFriendsActions).errors
                }
            };

        default:
            return state.profilePage;
    }
};

export default updateProfilePage;
