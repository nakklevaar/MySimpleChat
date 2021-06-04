import "./about-subpage.css";

import Content from "./content";
import Sidebar from "./sidebar";

const AboutSubpage = () => {
	return (
		<div className="profile-about-subpage">
			<Sidebar />
			<Content />
		</div>
	);
};

export default AboutSubpage;
