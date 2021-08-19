import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NewCrossword from "../components/NewCrossword";
import Main from "../components/Main";
import { Screen } from "../types";

import "./Application.scss";
import { UserInterfaceState } from "../redux/reducers/userInterfaceReducer";
import { setScreen } from "../redux/actions/userInterfaceActions";
import { newDocument } from "../redux/actions/documentActions";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Application = (): JSX.Element => {
    const ui = useAppSelector((state) => state.userInterface);
    const dispatch = useAppDispatch();

    switch (ui.screen) {
        case Screen.MAIN:
            return <Main />;
        case Screen.WELCOME:
            return (
                <NewCrossword
                    createCrossword={(title, width, height) => {
                        dispatch(newDocument(title, width, height));
                        dispatch(setScreen(Screen.MAIN));
                    }}
                />
            );
        default:
            return <div>ERROR</div>;
    }
};

export default Application;
