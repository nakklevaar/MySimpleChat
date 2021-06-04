import { Dispatch, bindActionCreators } from "redux";

import { Component } from "react";
import IApiService from "types/services/api-service";
import { IAuthService } from "types/services/auth-service";
import { ICurrentUser } from "types/state/user";
import { ILoadUser } from "types/actions/user";
import { IState } from "types/state";
import Loading from "components/loading";
import { connect } from "react-redux";
import { loadCurrentUser } from "actions/user";
import withApiService from "./with-api-service";

interface IProps {
    authService: IAuthService;
    loadCurrentUser: ILoadUser;
    user: ICurrentUser;
}

class AuthProvider extends Component<IProps> {
    async componentDidMount() {
        const user = await this.props.authService.tryGetUserOrRedirect();
        this.props.loadCurrentUser(user);
    }

    render() {
        return this.props.user.isAuthentificated ? this.props.children : <Loading />;
    }
}

const mapStateToProps = ({ user }: IState) => ({ user });

const mapDispatchToProps = (dispatch: Dispatch, { apiService }: { apiService: IApiService }) => (
    bindActionCreators({ loadCurrentUser: loadCurrentUser(apiService) }, dispatch)
);

export default withApiService()(connect(mapStateToProps, mapDispatchToProps)(AuthProvider));
