import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellEffect, CellType, CrosswordCell, CrosswordDocument } from "../../types";
import undoable, { StateWithHistory } from "redux-undo";

export type DocumentState = CrosswordDocument | null;

export const documentSlice = createSlice({
    name: "document",
    initialState: null as DocumentState,
    reducers: {
        newDocument: (
            _,
            action: PayloadAction<{ width: number; height: number; title: string }>
        ) => {
            return {
                width: action.payload.width,
                height: action.payload.height,
                // FIXME: verify that this object literal is not a singular copy
                cells: new Array<CrosswordCell>(action.payload.width * action.payload.height).fill({
                    type: CellType.LETTER,
                    content: "",
                    notes: "",
                    effects: [],
                    borders: [false, false, false, false]
                }),
                title: action.payload.title
            };
        },
        setCellContent: (state, action: PayloadAction<{ index: number; content: string }>) => {
            if (state === null) return;
            state.cells[action.payload.index].content = action.payload.content.toUpperCase();
        },
        setCellBackgroundColor: (
            state,
            action: PayloadAction<{ index: number; color: string }>
        ) => {
            if (state === null) return;
            state.cells[action.payload.index].backgroundColor = action.payload.color;
        },
        setCellTextColor: (state, action: PayloadAction<{ index: number; color: string }>) => {
            if (state === null) return;
            state.cells[action.payload.index].textColor = action.payload.color;
        },
        setCellBorder: (
            state,
            action: PayloadAction<{ index: number; border: [boolean, boolean, boolean, boolean] }>
        ) => {
            if (state === null) return;
            state.cells[action.payload.index].borders = action.payload.border;
        },
        setCellEffects: (
            state,
            action: PayloadAction<{ index: number; effects: CellEffect[] }>
        ) => {
            if (state === null) return;
            state.cells[action.payload.index].effects = action.payload.effects;
        },
        setCellNotes: (state, action: PayloadAction<{ index: number; notes: string }>) => {
            if (state === null) return;
            state.cells[action.payload.index].notes = action.payload.notes;
        },
        setCellClue: (state, action: PayloadAction<{ index: number; clue: string }>) => {
            if (state === null) return;
            state.cells[action.payload.index].clue = action.payload.clue;
        },
        setCellType: (state, action: PayloadAction<{ index: number; cellType: CellType }>) => {
            if (state === null) return;
            state.cells[action.payload.index].type = action.payload.cellType;
        }
    }
});

export const {
    newDocument,
    setCellContent,
    setCellBackgroundColor,
    setCellTextColor,
    setCellBorder,
    setCellEffects,
    setCellNotes,
    setCellClue,
    setCellType
} = documentSlice.actions;

export default undoable(documentSlice.reducer);

export type DocumentStateWithHistory = StateWithHistory<DocumentState>;
