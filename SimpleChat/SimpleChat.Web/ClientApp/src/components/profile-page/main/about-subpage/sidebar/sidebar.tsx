import "./sidebar.css";

import { RouteComponentProps, withRouter } from "react-router-dom";

import SidebarItem from "./sidebar-item";
import { connect } from "react-redux";

interface IProps {
    id: string;
}

const Sidebar = ({ id }: IProps) => {
    return (
        <div className="profile-about-sidebar profile-sidebar module">
            <div className="profile-about-sidebar__header module-header">
                Statistics
            </div>
            <div className="profile-about-sidebar__body profile-sidebar-body">
                <ul className="profile-about-sidebar-nav profile-sidebar-nav">
                    <SidebarItem
                        className="fa fa-certificate"
                        link={"/profile/" + id}
                        title="Points"
                        value="0" />
                    <SidebarItem
                        className="fa fa-user-friends"
                        link={"/profile/" + id + "/friends"}
                        title="Friends"
                        value="0" />
                    <SidebarItem
                        className="fa fa-images"
                        link="/"
                        title="Albums"
                        value="0" />
                    <SidebarItem
                        className="fa fa-user-secret"
                        link="/"
                        title="Followers"
                        value="0" />
                </ul>
            </div>
        </div >
    );
};

const mapStateToProps = (_state: any, { match }: RouteComponentProps<{ id: string }>) => (
    { id: match.params.id });

export default withRouter(connect(mapStateToProps)(Sidebar));
