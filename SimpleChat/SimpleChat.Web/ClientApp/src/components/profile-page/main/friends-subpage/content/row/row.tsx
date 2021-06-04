import "./row.css";

import { IUser } from "types/state";
import { Link } from "react-router-dom";
import config from "config.json";

interface IProps {
    user: IUser;
}

const Row = ({ user: { id, firstName, lastName, imageSource } }: IProps) => {
    const imgUrl = `${config.imagesPath}${imageSource}`;
    return (
        <div className="profile-friends-content__item">
            <div className="profile-friends-item">
                <div className="profile-friends-item__avatar">
                    <Link
                        to="#"
                        className="profile-friends-item__avatar-link"
                    >
                        <img src={imgUrl} alt="" />
                    </Link>
                </div>
                <div className="profile-friends-item__card">
                    <div className="profile-friends-item__title">
                        <Link to={`/profile/${id}`}>
                            {firstName + " " + lastName}
                        </Link>
                    </div>
                    <div className="profile-friends-item__meta">
                        <p>0 Mutual Friends</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Row;