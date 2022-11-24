import { Reducer } from "redux";
import undoable, { StateWithHistory } from "redux-undo";
import { CrosswordDocument, CellType, CrosswordCell } from "../../types";
import {
    DocumentAction,
    NEW_DOCUMENT,
    SET_CELL_BACKGROUND_COLOR,
    SET_CELL_BORDER,
    SET_CELL_CLUE,
    SET_CELL_CONTENT,
    SET_CELL_EFFECTS,
    SET_CELL_NOTES,
    SET_CELL_TEXT_COLOR,
    SET_CELL_TYPE
} from "../actions/documentActions";

const documentReducer: Reducer<DocumentState, DocumentAction> = (
    state = null,
    action: DocumentAction
) => {
    switch (action.type) {
        case NEW_DOCUMENT:
            return {
                width: action.width,
                height: action.height,
                // FIXME: verify that this object literal is not a singular copy
                cells: new Array<CrosswordCell>(action.width * action.height).fill({
                    type: CellType.LETTER,
                    content: "",
                    notes: "",
                    effects: [],
                    borders: [false, false, false, false]
                }),
                title: action.title
            };
        case SET_CELL_CONTENT:
        case SET_CELL_BACKGROUND_COLOR:
        case SET_CELL_TEXT_COLOR:
        case SET_CELL_BORDER:
        case SET_CELL_EFFECTS:
        case SET_CELL_CLUE:
        case SET_CELL_TYPE:
        case SET_CELL_NOTES: {
            // We can't operate on the cell if we don't have a document
            if (state === null) return state;
            const cells = [...state.cells];
            const newCell = { ...cells[action.index] };

            // Modify the cell based on the action
            if (action.type === SET_CELL_BACKGROUND_COLOR) {
                newCell.backgroundColor = action.color;
            } else if (action.type === SET_CELL_TEXT_COLOR) {
                newCell.backgroundColor = action.color;
            } else if (action.type === SET_CELL_CONTENT) {
                newCell.content = action.content.toUpperCase();
            } else if (action.type === SET_CELL_BORDER) {
                newCell.borders = action.border;
            } else if (action.type === SET_CELL_EFFECTS) {
                newCell.effects = action.effects;
            } else if (action.type === SET_CELL_NOTES) {
                newCell.notes = action.notes;
            } else if (action.type === SET_CELL_CLUE) {
                newCell.clue = action.clue;
            } else if (action.type === SET_CELL_TYPE) {
                newCell.type = action.cellType;
            }

            cells[action.index] = newCell;
            return {
                ...state,
                cells
            };
        }
        default:
            return state;
    }
};

export const undoableDocumentReducer = undoable(documentReducer);

export type DocumentState = CrosswordDocument | null;

export type DocumentStateWithHistory = StateWithHistory<DocumentState>;
