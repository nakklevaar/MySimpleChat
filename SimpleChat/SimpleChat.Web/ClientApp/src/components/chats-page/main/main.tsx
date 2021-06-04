import "./main.css";

import { Route, Switch } from "react-router";

import ChatsSubPage from "./chats-subpage";
import CurrentChat from "./current-chat-subpage";

const ChatsPageMain = () => {
    return (
        <div className="chats-page-main" style={{ minHeight: window.innerHeight - 168 }}>
            <Switch>
                <Route path="/chats" component={ChatsSubPage} exact />
                <Route path="/chats/:id" component={CurrentChat} />
            </Switch>
        </div >
    );
};

export default ChatsPageMain;
