import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import icon from "../../assets/icon.svg";
import store from "./redux/store";
import Application from "./containers/Application";

export default function App() {
    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
