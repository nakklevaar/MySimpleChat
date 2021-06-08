import { User, UserManager } from "oidc-client";
import { IAuthService } from "types/services/auth-service";

const config1 = {
    authority: "https://localhost:10001",
    client_id: "simpleChatJS",
    redirect_uri: "https://localhost:5001/callback",
    silent_redirect_uri: "https://localhost:5001/refresh",
    response_type: "code",
    scope: "openid profile simpleChatStorage offline_access"
};

export default class AuthService implements IAuthService {
    private userManager = new UserManager(config1);

    constructor() {
        this.userManager.events.addUserSignedOut(this.signinRedirect);
    }

    tryGetUserOrRedirect = () => {
        return this.getUser().then((user) => user || this.signinOrRedirect());
    };

    signinOrRedirect = () => {
        return this.signinSilent().catch(this.signinRedirect) as unknown as Promise<User>;
    };

    getUser = () => this.userManager.getUser();

    signinRedirect = () => this.userManager.signinRedirect();

    signinSilent = () => this.userManager.signinSilent();

    signOut = () => this.userManager.signoutRedirect();

    removeUser = () => this.userManager.removeUser();
}
