import "./app.css";

import { Redirect, Route, Switch } from "react-router-dom";

import ChatsPage from "../chats-page";
import Header from "../header";
import ProfilePage from "../profile-page";
import React from "react";
import SideMenu from "../side-menu";

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="main">
                <SideMenu />
                <Switch>
                    <Route path="/profile/:id" component={ProfilePage} />
                    <Route path="/chats" component={ChatsPage} />
                    <Redirect to="/chats" />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default App;
