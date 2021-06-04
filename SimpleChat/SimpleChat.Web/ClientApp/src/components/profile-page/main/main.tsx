import "./main.css";

import { Route, Switch } from "react-router-dom";

import AboutSubpage from "./about-subpage";
import FriendsSubpage from "./friends-subpage";

const Main = () => {
    return (
        <div className="profile-main">
            <Switch>
                <Route
                    path="/profile/:id"
                    component={AboutSubpage}
                    exact
                />
                <Route
                    path="/profile/:id/friends"
                    component={FriendsSubpage}
                />
            </Switch>
        </div>
    );
};

export default Main;
