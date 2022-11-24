import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    Tool,
    DictionarySearchMode,
    CellSpan,
    SymmetryMode,
    PanelMode,
    Screen,
    Orientation
} from "../../types";

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

export const userInterfaceSlice = createSlice({
    name: "userInterface",
    initialState: userInterfaceDefaultState,
    reducers: {
        setScreen(state, action: PayloadAction<Screen>) {
            state.screen = action.payload;
        },
        setTool(state, action: PayloadAction<Tool>) {
            state.activeTool = action.payload;
        },
        setDictionarySearch(state, action: PayloadAction<string>) {
            state.dictionarySearch = action.payload;
        },
        setDictionarySearchRegex(state, action: PayloadAction<boolean>) {
            state.dictionarySearchRegex = action.payload;
        },
        setDictionarySearchMode(state, action: PayloadAction<DictionarySearchMode>) {
            state.dictionarySearchMode = action.payload;
        },
        setSelectedCells(state, action: PayloadAction<CellSpan | null>) {
            state.selectedCells = action.payload;
        },
        setActiveCellIndex(state, action: PayloadAction<number>) {
            state.activeCellIndex = action.payload;
        },
        setActiveCellOrientation(state, action: PayloadAction<Orientation>) {
            state.activeCellOrientation = action.payload;
        },
        setBlockToolSymmetry(state, action: PayloadAction<SymmetryMode>) {
            state.blockToolSymmetry = action.payload;
        },
        setPanelMode(state, action: PayloadAction<PanelMode>) {
            state.panelMode = action.payload;
        }
    }
});

export const {
    setScreen,
    setTool,
    setDictionarySearch,
    setDictionarySearchRegex,
    setDictionarySearchMode,
    setSelectedCells,
    setActiveCellIndex,
    setActiveCellOrientation,
    setBlockToolSymmetry,
    setPanelMode
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
