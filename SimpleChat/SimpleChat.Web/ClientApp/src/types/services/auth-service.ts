import { User } from "oidc-client";

export interface IAuthService {
    tryGetUserOrRedirect: () => Promise<User>;

    signinOrRedirect: () => Promise<User>;

    signinRedirect: () => Promise<void>;

    getUser: () => Promise<User | null>;

    signinSilent: () => Promise<User>;
}