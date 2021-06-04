import "./side-menu.css";

import React, { Component } from "react";
import { RouteComponentProps, match, withRouter } from "react-router-dom";

import { IState } from "types/state";
import NavItem from "./nav-item";
import { connect } from "react-redux";
import { getOwnId } from "selectors/chats-page";

interface IProps {
	id: string;
	pathName: string;
	location: any;
}

class SideMenu extends Component<IProps> {
	render() {
		const path = this.props.pathName.slice(0,
			this.props.pathName.indexOf("/", 1) < 0
				? this.props.pathName.length
				: this.props.pathName.indexOf("/", 1));
		return (
			<div className="side-menu">
				<ul className="main-navbar">
					<NavItem title="Моя страница"
						iconClassName="fa fa-home"
						resourceUrl={`/profile/${this.props.id}`}
						selected={"/profile" == path} />
					<NavItem title="Сообщения"
						iconClassName="fa fa-comments"
						resourceUrl={"/chats"}
						selected={"/chats" == path} />
					<NavItem title="Друзья"
						iconClassName="fa fa-user-friends"
						resourceUrl={`/profile/${this.props.id}`}
						selected={false} />
					<NavItem title="Пользователи"
						iconClassName="fa fa-users"
						resourceUrl={`/profile/${this.props.id}`}
						selected={false} />
				</ul>
			</div>
		);
	}
}


const mapStateToProps = (state: IState, { location }: RouteComponentProps) => ({
	id: getOwnId(state),
	pathName: location.pathname
});

export default withRouter(connect(mapStateToProps)(SideMenu));