import { IUser } from ".";
import { User } from "oidc-client";

export interface ICurrentUser {
    info: IUser;
    isAuthentificated: boolean;
    authDetails: User;
}