import "./sidebar.css";

import { IUser } from "types/state";

interface IProps {
    users: IUser[];
}

const Sidebar = ({ users }: IProps) => {
    return (
        <div className="profile-friends-sidebar module profile-sidebar">
            <div className="profile-friends-sidebar__header module-header">
                Friends
            </div>
            <div className="profile-friends-sidebar__body profile-sidebar-body">
                <ul className="profile-friends-sidebar-nav profile-sidebar-nav">
                    <li className="profile-friends-sidebar__item">
                        <a href="#" className="profile-friends-sidebar__link">
                            All Friends
                        </a>
                        <span className="profile-friends-sidebar__counter">
                            {users.length}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
