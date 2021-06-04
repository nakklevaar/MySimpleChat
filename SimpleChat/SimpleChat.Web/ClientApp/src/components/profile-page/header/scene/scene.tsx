import "./scene.css";

import { IUser } from "types/state";
import config from "config.json";

interface IProps {
    user: IUser;
}

const Scene = ({ user: { imageSource, firstName } }: IProps) => {
    const imgUrl = `${config.imagesPath}${imageSource}`;
    return (
        <div className="profile-header__scene">
            <div className="profile-header__cover"></div>
            <div className="profile-header__card">
                <div className="profile-header__info">
                    <h1 className="profile-header__title">{firstName}</h1>
                    <h2 className="profile-header__status">Registered Users</h2>
                </div>
                <div className="profile-header__avatar">
                    <img src={imgUrl} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Scene;
