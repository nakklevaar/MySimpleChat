import { USER_AUTH_DETAILS_SUCCESS, USER_INFO_LOADED, UserAuthActions } from "types/actions/user";
import { IState } from "types/state";
import { ICurrentUser } from "types/state/user";

const initial = {
    info: {} as any,
    isAuthentificated: false,
    authDetails: {} as any
};

const updateUserAuth = (state: IState | undefined, action: UserAuthActions): ICurrentUser => {
    if (state === undefined) {
        return initial;
    }

    switch (action.type) {
        case USER_AUTH_DETAILS_SUCCESS: {
            return {
                ...state.user,
                authDetails: action.user
            };
        }

        case USER_INFO_LOADED: {
            return {
                ...state.user,
                info: action.user,
                isAuthentificated: true
            };
        }

        default:
            return state.user;
    }
};

export default updateUserAuth;
