import App from "components/app";
import { ApiServiceProvider } from "components/contexts";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ApiService from "services/api-service";
import SignalRService from "services/signalr-service";

import { AuthProvider } from "./components/hoc";
import AuthService from "./services/auth-service";
import store from "./store";

export const authService = new AuthService();
const apiService = new ApiService(authService);
new SignalRService(store.dispatch);


ReactDOM.render(
    <Router>
        <Provider store={store}>
            <ApiServiceProvider value={apiService}>
                <AuthProvider authService={authService}>
                    <App />
                </AuthProvider>
            </ApiServiceProvider>
        </Provider>
    </Router>
    , document.getElementById("root"));