import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./components/Mainpage/Pages";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <div className="app_menu">
                        <Menu />
                    </div>
                    <div className="app_main">
                        <Header />
                        <div className="Pages">
                            <MainPage />
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </Router>
        </Provider>
    );
};

export default App;
