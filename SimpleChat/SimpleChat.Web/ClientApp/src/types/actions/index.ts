import { IAction, IState } from "types/state";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type IThunkDispatch = ThunkDispatch<IState, never, IAction>;
export type IThunkAction = ThunkAction<void, IState, never, IAction>;

export interface DispatchAction {
    (): void;
}