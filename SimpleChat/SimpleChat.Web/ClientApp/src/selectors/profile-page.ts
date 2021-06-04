import { IState } from "types/state";

export const getUser = (state: IState) => state.profilePage.user;

export const getAbout = (state: IState) => state.profilePage.about;

export const getFriends = (state: IState) => state.profilePage.friends;