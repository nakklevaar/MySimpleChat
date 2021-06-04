import "./nav-item.css";

import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    link: string;
}

const NavItem = ({ children, link }: IProps) => {
    return (
        <div className="profile-header-nav__item">
            <Link
                to={link}
                className="profile-header-nav__link"
            >
                {children}
            </Link>
        </div>
    );
};

export default NavItem;
