import React from "react";
import NewCrossword from "../components/NewCrossword";
import { newDocument } from "../redux/actions/documentActions";
import { setScreen } from "../redux/actions/userInterfaceActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Screen } from "../types";

export default function HomeScreen(): JSX.Element {
    const ui = useAppSelector((state) => state.userInterface);
    const dispatch = useAppDispatch();
    return (
        <NewCrossword
            createCrossword={(title, width, height) => {
                dispatch(newDocument(title, width, height));
                dispatch(setScreen(Screen.MAIN));
            }}
        />
    );
}
