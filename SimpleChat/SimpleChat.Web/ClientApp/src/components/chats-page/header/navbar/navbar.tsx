import "./navbar.css";

import NavItem from "./nav-item";

const Navbar = () => {
    return (
        <div className="chats-header__nav">
            <ul className="chats-header__nav-list">
                <NavItem>Recent</NavItem>
                <NavItem>Starred</NavItem>
                <NavItem>Soon</NavItem>
                <NavItem>Soon</NavItem>
            </ul>
        </div>
    );
};

export default Navbar;