import "./sidebar-item.css";

import { Link } from "react-router-dom";

interface IProps {
    className: string;
    link: string;
    title: string;
    value: string;
}

const SidebarItem = ({ className, link, title, value }: IProps) => {
    return (
        <li className="profile-about-sidebar__item">
            <Link to={link} className="profile-about-sidebar__link">
                <span className={className}></span>
                <b>{value}</b>{title}
            </Link>
        </li>
    );
};

export default SidebarItem;
