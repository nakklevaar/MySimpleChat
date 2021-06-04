import "./navbar.css";

import NavItem from "./nav-item";

interface IProps {
    id: string;
}

const Navbar = ({ id }: IProps) => {
    return (
        <div className="profile-header-nav">
            <NavItem link={`/profile/${id}`}>About</NavItem>
            <NavItem link={`/profile/${id}/friends`}>Friends</NavItem>
            <NavItem link={`/profile/${id}/friends`}>Followers</NavItem>
            {/*<NavItem link={`/profile/${id}/friends`}>Friends</NavItem> */}
        </div >
    );
};

export default Navbar;