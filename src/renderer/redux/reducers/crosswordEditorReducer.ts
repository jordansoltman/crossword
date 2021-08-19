import { Reducer } from "redux";
import { Tool } from "../../types";
import { EditorStateActions, SET_TOOL } from "../actions/editorStateActions";
import { Screen, UserInterfaceAction, SET_SCREEN } from "../actions/userInterfaceActions";

export interface CrosswordEditorState {
    tool: Tool;
}

const crosswordEditorDefaultState: CrosswordEditorState = {
    tool: Tool.BLOCK
};

export const crosswordEditorReducer: Reducer<CrosswordEditorState, EditorStateActions> = (
    state = crosswordEditorDefaultState,
    action: EditorStateActions
) => {
    switch (action.type) {
        case SET_TOOL:
            return {
                ...state,
                tool: action.tool
            };
        default:
            return state;
    }
};
