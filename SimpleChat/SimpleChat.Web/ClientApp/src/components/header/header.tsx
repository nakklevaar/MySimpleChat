import "./header.css";

import { IState, IUser } from "types/state";

import { Link } from "react-router-dom";
import React from "react";
import { authService } from "index";
import config from "config";
import { connect } from "react-redux";
import img from "./logo.png";

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authService.removeUser();
    formRef.current?.submit();
};

const formRef = React.createRef<HTMLFormElement>();

interface IProps {
    userInfo: IUser;
}

const Header = ({ userInfo }: IProps) => {
    const imgUrl = `${config.imagesPath}${userInfo.imageSource}`;
    return (
        <header className="header">
            <div className="container">
                <div className="header__logo-wrapper">
                    <img src={img} className="header__logo" />
                    <h2 className="header__title">My Simple Chat</h2>
                </div>
                <div className="header__user-logo">
                    <Link to={"/profile/" + userInfo.id} >
                        <img src={imgUrl} />
                    </Link>
                </div>
                <form action="/logout" className="logout-form" ref={formRef} onSubmit={onSubmit}>
                    <button className="logout">Log out</button>
                </form>
            </div>
        </header>
    );
};

const mapStateToProps = (state: IState) => ({
    userInfo: state.user.info
});

export default connect(mapStateToProps)(Header);
