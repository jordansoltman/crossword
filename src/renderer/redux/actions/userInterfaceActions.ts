import { Action } from "redux";
import {
    CellSpan,
    DictionarySearchMode,
    Orientation,
    PanelMode,
    SymmetryMode,
    Screen,
    Tool
} from "../../types";

export const SET_SCREEN = "SET_SCREEN";
export interface SetScreenAction extends Action {
    type: typeof SET_SCREEN;
    screen: Screen;
}
export const setScreen = (screen: Screen): SetScreenAction => ({
    type: SET_SCREEN,
    screen
});

export const SET_TOOL = "SET_TOOL";
export interface SetToolAction extends Action<typeof SET_TOOL> {
    tool: Tool;
}
export const setTool = (tool: Tool): SetToolAction => ({
    type: SET_TOOL,
    tool
});

export const SET_DICTIONARY_SEARCH = "SET_DICTIONARY_SEARCH";
export interface SetDictoinarySearchAction extends Action<typeof SET_DICTIONARY_SEARCH> {
    search: string;
}
export const setDictionarySearch = (search: string): SetDictoinarySearchAction => ({
    type: SET_DICTIONARY_SEARCH,
    search
});

export const SET_DICTIONARY_SEARCH_REGEX = "SET_DICTIONARY_SEARCH_REGEX";
export interface SetDictionarySearchRegexAction extends Action<typeof SET_DICTIONARY_SEARCH_REGEX> {
    enabled: boolean;
}
export const setDictionarySearchRegex = (enabled: boolean): SetDictionarySearchRegexAction => ({
    type: SET_DICTIONARY_SEARCH_REGEX,
    enabled
});

export const SET_DICTIONARY_SEARCH_MODE = "SET_DICTIONARY_SEARCH_MODE";
export interface SetDictionarySearchModeAction extends Action<typeof SET_DICTIONARY_SEARCH_MODE> {
    mode: DictionarySearchMode;
}
export const setDictionarySearchMode = (
    mode: DictionarySearchMode
): SetDictionarySearchModeAction => ({
    type: SET_DICTIONARY_SEARCH_MODE,
    mode
});

export const SET_SELECTED_CELLS = "SET_SELECTED_CELLS";
export interface SetSelectedCellsAction extends Action<typeof SET_SELECTED_CELLS> {
    selectedCells: CellSpan;
}
export const setSelectedCells = (startIndex: number, endIndex: number): SetSelectedCellsAction => ({
    type: SET_SELECTED_CELLS,
    selectedCells: [startIndex, endIndex]
});

export const CLEAR_SELECTED_CELLS = "CLEAR_SELECTED_CELLS";
export type ClearSelectedCellsAction = Action<typeof CLEAR_SELECTED_CELLS>;
export const clearSelectedCells = (): ClearSelectedCellsAction => ({
    type: CLEAR_SELECTED_CELLS
});

export const SET_ACTIVE_CELL_INDEX = "SET_SELECTED_CELL_INDEX";
export interface SetActiveCellIndexAction extends Action<typeof SET_ACTIVE_CELL_INDEX> {
    index: number;
}
export const setActiveCellIndex = (index: number): SetActiveCellIndexAction => ({
    type: SET_ACTIVE_CELL_INDEX,
    index
});

export const SET_ACTIVE_CELL_ORIENTATION = "SET_ACTIVE_CELL_ORIENTATION";
export interface SetActiveCellOrientationAction extends Action<typeof SET_ACTIVE_CELL_ORIENTATION> {
    orientation: Orientation;
}
export const setActiveCellOrientation = (
    orientation: Orientation
): SetActiveCellOrientationAction => ({
    type: SET_ACTIVE_CELL_ORIENTATION,
    orientation
});

export const SET_BLOCK_TOOL_SYMMETRY = "SET_BLOCK_TOOL_SYMMETRY";
export interface SetBlockToolSymmetryAction extends Action<typeof SET_BLOCK_TOOL_SYMMETRY> {
    mode: SymmetryMode;
}
export const setBlockToolSymmetry = (mode: SymmetryMode): SetBlockToolSymmetryAction => ({
    type: SET_BLOCK_TOOL_SYMMETRY,
    mode
});

export const SET_PANEL_MODE = "SET_PANEL_MODE";
export interface SetPanelModeAction extends Action<typeof SET_PANEL_MODE> {
    mode: PanelMode;
}
export const setPanelMode = (mode: PanelMode): SetPanelModeAction => ({
    type: SET_PANEL_MODE,
    mode
});

export type UserInterfaceAction =
    | SetScreenAction
    | SetToolAction
    | SetDictoinarySearchAction
    | SetDictionarySearchRegexAction
    | SetDictionarySearchModeAction
    | SetSelectedCellsAction
    | ClearSelectedCellsAction
    | SetActiveCellIndexAction
    | SetActiveCellOrientationAction
    | SetBlockToolSymmetryAction
    | SetPanelModeAction;
