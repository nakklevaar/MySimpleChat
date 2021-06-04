import "./nav-item.css";

import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

const NavItem = ({ children }: IProps) => {
    return (
        <li className="chats-header__nav-item">
            <a href="" className="chats-header__nav-link">
                {children}
            </a>
        </li>
    );
};

export default NavItem;