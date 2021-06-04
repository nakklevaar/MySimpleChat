import { Store, applyMiddleware, createStore } from "redux";

import { IState } from "types/state";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import thunk from "redux-thunk";

const store: Store<IState> = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;