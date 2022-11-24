import React from "react";
import NewCrossword from "../components/NewCrossword";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { newDocument } from "../redux/slices/documentSlice";
import { setScreen } from "../redux/slices/userinterfaceSlice";
import { Screen } from "../types";

export default function HomeScreen(): JSX.Element {
    const ui = useAppSelector((state) => state.userInterface);
    const dispatch = useAppDispatch();
    return (
        <NewCrossword
            createCrossword={(title, width, height) => {
                dispatch(newDocument({ title, width, height }));
                dispatch(setScreen(Screen.MAIN));
            }}
        />
    );
}
