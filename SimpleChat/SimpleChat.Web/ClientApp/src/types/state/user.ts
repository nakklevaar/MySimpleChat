import { User } from "oidc-client";

import { IUser } from ".";

export interface ICurrentUser {
    info: IUser;
    isAuthentificated: boolean;
    authDetails: User;
}