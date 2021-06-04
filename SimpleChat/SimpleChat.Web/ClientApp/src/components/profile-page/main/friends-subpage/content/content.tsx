import "./content.css";

import { IUser } from "types/state";
import Row from "./row";

interface IProps {
    users: IUser[];
}

const Content = ({ users }: IProps) => {
    return (
        <div className="profile-friends-content">
            <div className="profile-friends-content__header">
                <h2 className="profile-friends-content__title">All Friends</h2>
            </div>
            <div className="profile-friends-content__body">
                {users.map((user) => <Row user={user} key={user.id} />)}
            </div>
        </div>
    );
};

export default Content;