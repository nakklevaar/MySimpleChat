import "./friends-subpage.css";

import { DefaultPropsTuple, IRequestable, IState, IUser, StateStatus } from "types/state";
import { getFriends, getUser } from "selectors/profile-page";

import { Component } from "react";
import Content from "./content";
import { IFetchProfile } from "types/actions/profile-page";
import { IThunkDispatch } from "types/actions";
import Loading from "components/loading";
import Sidebar from "./sidebar";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchFriends } from "actions/profile-page";
import { withApiService } from "components/hoc";
import { withRouter } from "react-router-dom";

interface IProps {
    users: IUser[];
}

const ProfileFriendsSubpage = ({ users }: IProps) => {
    return (
        <div className="profile-friends-subpage">
            <Sidebar users={users} />
            <Content users={users} />
        </div>
    );
};

interface IContainerProps {
    friends: IRequestable<IUser[]>;
    id: string;
    user: IUser;
    fetchFriends: IFetchProfile;
}

class ProfileFriendsContainer extends Component<IContainerProps> {
    componentDidMount() {
        this.props.fetchFriends(this.props.id);
    }

    render() {
        return this.props.friends.status !== StateStatus.Loaded
            ? <Loading />
            : <ProfileFriendsSubpage users={this.props.friends.data} />;
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    friends: getFriends(state),
    user: getUser(state).data,
    id: match.params.id
});

const mapDispatchToProps = (dispatch: IThunkDispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({ fetchFriends: fetchFriends(apiService) }, dispatch));

export default withRouter(
    withApiService()(
        connect(mapStateToProps, mapDispatchToProps)(ProfileFriendsContainer)));