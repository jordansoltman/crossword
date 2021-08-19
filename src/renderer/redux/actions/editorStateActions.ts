import { Action, ActionCreator } from "redux";
import { Tool } from "../../types";

export const SET_TOOL = "SET_TOOL";

export interface ChangeToolAction extends Action<typeof SET_TOOL> {
    tool: Tool;
}

export const setTool: ActionCreator<ChangeToolAction> = (tool: Tool) => ({
    tool,
    type: SET_TOOL
});

export type EditorStateActions = ChangeToolAction;
