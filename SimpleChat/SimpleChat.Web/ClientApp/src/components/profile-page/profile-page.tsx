import "./profile-page.css";

import { DefaultPropsTuple, IRequestable, IState, IUser, StateStatus } from "types/state";

import { Component } from "react";
import Header from "./header";
import { IFetchProfile } from "types/actions/profile-page";
import { IThunkDispatch } from "types/actions";
import Loading from "components/loading";
import Main from "./main";
import PageLayout from "components/page-layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "actions/profile-page";
import { getUser } from "selectors/profile-page";
import { withApiService } from "components/hoc";
import { withRouter } from "react-router-dom";

const ProfilePage = () => {
    return (
        <PageLayout
            left={
                <div className="profile">
                    <Header />
                    <Main />
                </div>
            }
        />
    );
};

interface IContainerProps {
    id: string;
    user: IRequestable<IUser>;
    fetchUser: IFetchProfile;
}

class ProfilePageContainer extends Component<IContainerProps> {
    componentDidMount() {
        this.props.fetchUser(this.props.id);
    }

    componentDidUpdate(prevProps: IContainerProps) {
        if (prevProps.id !== this.props.id) {
            this.props.fetchUser(this.props.id);
        }
    }

    render() {
        return this.props.user.status !== StateStatus.Loaded
            ? <Loading />
            : <ProfilePage />;
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    user: getUser(state),
    id: match.params.id
});

const mapDispatchToProps = (dispatch: IThunkDispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({ fetchUser: fetchUser(apiService) }, dispatch));

export default
    withRouter(
        withApiService()(
            connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer)));