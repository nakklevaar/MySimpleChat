import "./content.css";

import { DefaultPropsTuple, IRequestable, IState, IUser, StateStatus } from "types/state";
import { Dispatch, bindActionCreators } from "redux";
import { getAbout, getUser } from "selectors/profile-page";

import { Component } from "react";
import { IAbout } from "types/state/profile-page";
import { IFetchProfile } from "types/actions/profile-page";
import Loading from "components/loading";
import Row from "./row";
import { connect } from "react-redux";
import { fetchProfile } from "actions/profile-page";
import { withApiService } from "components/hoc";
import { withRouter } from "react-router-dom";

interface IProps {
    data: IAbout;
    user: IUser;
}

const Content = ({ data, user }: IProps) => {
    return (
        <div className="profile-about-content module">
            <div className="profile-about-content__header module-header">
                Basic Information
            </div>
            <div className="profile-about-content__body">
                {[
                    <Row prop={"name"} value={(user.firstName + " " + user.lastName)} key={0} />,

                    Object.keys(data).map((prop, i) =>
                        (prop != "id" && data[prop] ? <Row prop={prop} value={data[prop]} key={i} /> : null))
                ]}
            </div>
        </div>
    );
};

interface IContainerProps {
    about: IRequestable<IAbout>;
    user: IUser;
    id: string;
    fetchProfile: IFetchProfile;
}

class ContentContainer extends Component<IContainerProps> {
    componentDidMount() {
        if (this.props.about.status !== StateStatus.Loaded || this.props.user.id != this.props.id) {
            this.props.fetchProfile(this.props.id);
        }
    }

    render() {
        return this.props.about.status !== StateStatus.Loaded
            ? <Loading />
            : <Content
                data={this.props.about.data}
                user={this.props.user} />;
    }
}

const mapStateToProps = (state: IState, { match }: DefaultPropsTuple) => ({
    about: getAbout(state),
    user: getUser(state).data,
    id: match.params.id
});
const mapDispatchToProps = (dispatch: Dispatch, { apiService }: DefaultPropsTuple) => (
    bindActionCreators({ fetchProfile: fetchProfile(apiService) }, dispatch));

export default withRouter(
    withApiService()(
        connect(mapStateToProps, mapDispatchToProps)(ContentContainer)));