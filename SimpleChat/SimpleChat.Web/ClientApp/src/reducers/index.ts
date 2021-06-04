import { IAction, IState } from "types/state";

import updateChatsPage from "./chats-page";
import updateProfile from "./profile-page";
import updateUserAuth from "./user";

// import updateFriendList from "./friendsPage";

const reducer = (state: IState | undefined, action: IAction): IState => {
    return {
        user: updateUserAuth(state, action as any),
        profilePage: updateProfile(state, action),
        chatsPage: updateChatsPage(state, action as any)
        //friendsPage: updateFriendList(state, action),
    };
};

export default reducer;
