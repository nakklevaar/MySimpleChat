import "./nav-item.css";

import { Link } from "react-router-dom";

interface IProps {
    title: string;
    iconClassName: string;
    resourceUrl: string;
    selected: boolean;
}

const NavItem = ({ title, iconClassName, resourceUrl, selected }: IProps) => {
    return (
        <li className={`main-navbar__item ${selected ? "selected" : null}`}>
            <Link className="main-navbar__link" to={resourceUrl} onClick={(e) => { notImplementedClick(e, title); }}>
                <i className={`main-navbar__item-icon ${iconClassName}`}></i>
                <span className="main-navbar__item-title">{title}</span>
            </Link>
        </li >
    );
};

const notImplementedClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    if (title == "Друзья" || title == "Пользователи") {
        e.preventDefault();
        alert("Not Implemented");
    }
};

export default NavItem;