import ApiService from "services/api-service";
import { ApiServiceProvider } from "components/contexts/index";
import App from "components/app";
import { AuthProvider } from "./components/hoc";
import AuthService from "./services/auth-service";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SignalRService from "services/signalr-service";
import store from "./store";

const authService = new AuthService();
const apiService = new ApiService(authService);
const signalRService = new SignalRService(store.dispatch);


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