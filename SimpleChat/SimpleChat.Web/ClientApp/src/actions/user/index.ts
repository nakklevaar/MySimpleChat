import IApiService from "types/services/api-service";
import { ILoadUser } from "types/actions/user";
import { IUser } from "types/state";
import { User } from "oidc-client";

export const loadUserAuthDetails = (user: User) => ({
    type: "USER_AUTH_DETAILS_SUCCESS",
    user
});

export const loadUserInfo = (user: IUser) => ({
    type: "USER_INFO_LOADED",
    user
});

export const loadCurrentUser: (apiService: IApiService) => ILoadUser =
    (apiService: IApiService) =>
        (user) =>
            async (dispatch) => {
                dispatch(loadUserAuthDetails(user));
                const userInfo = await apiService.getUser(user.profile.sub);
                dispatch(loadUserInfo(userInfo));
            };