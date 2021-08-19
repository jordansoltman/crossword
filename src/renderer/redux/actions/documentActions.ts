import { ActionCreator, Action } from "redux";
import { CellBorder, CellEffect, CellType } from "../../types";

export const NEW_DOCUMENT = "NEW_DOCUMENT";
export interface NewDocumentAction extends Action<typeof NEW_DOCUMENT> {
    title: string;
    width: number;
    height: number;
}
export const newDocument = (title: string, width: number, height: number): NewDocumentAction => ({
    type: NEW_DOCUMENT,
    width,
    height,
    title
});

export const SET_CELL_CONTENT = "SET_CELL_CONTENT";
export interface SetCellContentAction extends Action {
    type: typeof SET_CELL_CONTENT;
    index: number;
    content: string;
}
export const setCellContent = (index: number, content: string): SetCellContentAction => ({
    type: SET_CELL_CONTENT,
    index,
    content
});

export const SET_CELL_BORDER = "SET_CELL_BORDER";
export interface SetCellBorderAction extends Action<typeof SET_CELL_BORDER> {
    index: number;
    border: CellBorder;
}
export const setCellBorderAction = (index: number, border: CellBorder): SetCellBorderAction => ({
    type: SET_CELL_BORDER,
    index,
    border
});

export const SET_CELL_BACKGROUND_COLOR = "SET_CELL_BACKGROUND_COLOR";
export interface SetCellBackgroundColorAction extends Action<typeof SET_CELL_BACKGROUND_COLOR> {
    index: number;
    color: string;
}
export const setCellBackgroundColor = (
    index: number,
    color: string
): SetCellBackgroundColorAction => ({
    type: SET_CELL_BACKGROUND_COLOR,
    index,
    color
});

export const SET_CELL_TEXT_COLOR = "SET_CELL_TEXT_COLOR";

export interface SetCellTextColorAction extends Action<typeof SET_CELL_TEXT_COLOR> {
    index: number;
    color: string;
}
export const setCellTextColor = (index: number, color: string): SetCellTextColorAction => ({
    type: SET_CELL_TEXT_COLOR,
    index,
    color
});

export const SET_CELL_NOTES = "SET_CELL_NOTES";
export interface SetCellNotesAction extends Action<typeof SET_CELL_NOTES> {
    index: number;
    notes: string;
}
export const setCellNotes = (index: number, notes: string): SetCellNotesAction => ({
    type: SET_CELL_NOTES,
    index,
    notes
});

export const SET_CELL_EFFECTS = "SET_CELL_EFFECTS";
export interface SetCellEffectsAction extends Action<typeof SET_CELL_EFFECTS> {
    index: number;
    effects: CellEffect[];
}
export const setCellEffects = (index: number, effects: CellEffect[]): SetCellEffectsAction => ({
    type: SET_CELL_EFFECTS,
    index,
    effects
});

export const SET_CELL_TYPE = "SET_CELL_TYPE";
export interface SetCellTypeAction extends Action<typeof SET_CELL_TYPE> {
    index: number;
    cellType: CellType;
}
export const setCellType = (index: number, cellType: CellType): SetCellTypeAction => ({
    type: SET_CELL_TYPE,
    index,
    cellType
});

export const SET_CELL_CLUE = "SET_CELL_CLUE";
export interface SetCellClueAction extends Action<typeof SET_CELL_CLUE> {
    index: number;
    clue?: string;
}
export const setCellClueAction = (index: number, clue?: string): SetCellClueAction => ({
    type: SET_CELL_CLUE,
    index,
    clue
});

export const SET_DOCUMENT_TITLE = "SET_DOCUMENT_TITLE";
export interface SetDocumentTitleAction extends Action<typeof SET_DOCUMENT_TITLE> {
    title: string;
}
export const setDocumentTitle = (title: string): SetDocumentTitleAction => ({
    type: SET_DOCUMENT_TITLE,
    title
});

export type DocumentAction =
    | NewDocumentAction
    | SetCellContentAction
    | SetCellBorderAction
    | SetCellBackgroundColorAction
    | SetCellTextColorAction
    | SetCellNotesAction
    | SetCellEffectsAction
    | SetCellTypeAction
    | SetCellClueAction;
