import { IRequestable, IUser } from "types/state";

export interface IProfilePage {
    user: IRequestable<IUser>;
    about: IRequestable<IAbout>;
    friends: IRequestable<IUser[]>;
}

export interface IAbout {
    birthday: string;
    country: string;
    city: string;
    [key: string]: any;
}
