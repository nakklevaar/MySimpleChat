import "./header.css";

import { IState, IUser } from "types/state";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Navbar from "./navbar";
import Scene from "./scene";
import { connect } from "react-redux";
import { getUser } from "selectors/profile-page";

interface IProps {
    user: IUser;
    id: string;
}

const Header = ({ user, id }: IProps) => {

    return (
        <div className="profile-header module">
            <Scene user={user} />
            <Navbar id={id} />
        </div>
    );
};

const mapStateToProps = (state: IState, { match }: RouteComponentProps<{ id: string }>) => {
    return {
        user: getUser(state).data,
        id: match.params.id
    };
};

export default withRouter(
    connect(mapStateToProps)(Header));
