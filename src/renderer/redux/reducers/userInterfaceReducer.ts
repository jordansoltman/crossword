import { Reducer } from "redux";
import {
    CellSpan,
    DictionarySearchMode,
    Orientation,
    PanelMode,
    SymmetryMode,
    Screen,
    Tool
} from "../../types";
import {
    UserInterfaceAction,
    SET_SCREEN,
    SET_DICTIONARY_SEARCH,
    SET_DICTIONARY_SEARCH_REGEX,
    SET_DICTIONARY_SEARCH_MODE,
    SET_SELECTED_CELLS,
    SET_ACTIVE_CELL_INDEX,
    CLEAR_SELECTED_CELLS,
    SET_ACTIVE_CELL_ORIENTATION,
    SET_BLOCK_TOOL_SYMMETRY,
    SET_PANEL_MODE,
    SET_TOOL
} from "../actions/userInterfaceActions";

export interface UserInterfaceState {
    screen: Screen;
    activeTool: Tool;
    dictionarySearch: string;
    dictionarySearchRegex: boolean;
    dictionarySearchMode: DictionarySearchMode;
    selectedCells: CellSpan | null;
    activeCellIndex: number;
    activeCellOrientation: Orientation;
    blockToolSymmetry: SymmetryMode;
    panelMode: PanelMode;
}

const userInterfaceDefaultState: UserInterfaceState = {
    screen: Screen.WELCOME,
    activeTool: Tool.POINTER,
    dictionarySearch: "",
    dictionarySearchRegex: false,
    dictionarySearchMode: DictionarySearchMode.WHOLE_WORD,
    selectedCells: null,
    activeCellIndex: 0,
    activeCellOrientation: Orientation.HORIZONTAL,
    blockToolSymmetry: SymmetryMode.ROTATIONAL,
    panelMode: PanelMode.CLUES
};

export const userInterfaceReducer: Reducer<UserInterfaceState, UserInterfaceAction> = (
    state = userInterfaceDefaultState,
    action: UserInterfaceAction
) => {
    switch (action.type) {
        case SET_SCREEN:
            return {
                ...state,
                screen: action.screen
            };
        case SET_TOOL:
            const newState = {
                ...state,
                activeTool: action.tool
            };
            return newState;
        case SET_DICTIONARY_SEARCH:
            return {
                ...state,
                dictionarySearch: action.search
            };
        case SET_DICTIONARY_SEARCH_REGEX:
            return {
                ...state,
                dictionarySearchRegex: action.enabled
            };
        case SET_DICTIONARY_SEARCH_MODE:
            return {
                ...state,
                dictionarySearchMode: action.mode
            };
        case SET_SELECTED_CELLS:
            return {
                ...state,
                selectedCells: action.selectedCells
            };
        case CLEAR_SELECTED_CELLS:
            return {
                ...state,
                selectedCells: null
            };
        case SET_ACTIVE_CELL_INDEX:
            return {
                ...state,
                activeCellIndex: action.index
            };
        case SET_ACTIVE_CELL_ORIENTATION:
            return {
                ...state,
                activeCellOrientation: action.orientation
            };
        case SET_BLOCK_TOOL_SYMMETRY:
            return {
                ...state,
                blockToolSymmetry: action.mode
            };
        case SET_PANEL_MODE:
            return {
                ...state,
                panelMode: action.mode
            };
        default:
            return state;
    }
};
