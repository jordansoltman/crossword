export enum CellType {
    LETTER = "LETTER",
    BLOCK = "BLOCK"
}

export enum Tool {
    POINTER = "POINTER",
    BLOCK = "BLOCK"
}

export type CellSpan = [startIndex: number, endIndex: number];

export enum Screen {
    WELCOME = "WELCOME",
    MAIN = "MAIN"
}

export enum DictionarySearchMode {
    STARTS_WITH = "STARTS_WITH",
    ENDS_WITH = "ENDS_WITH",
    WHOLE_WORD = "WHOLE_WORD"
}

export enum Orientation {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}

export enum SymmetryMode {
    NONE = "NONE",
    ROTATIONAL = "ROTATIONAL",
    HORIZONAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}

export enum PanelMode {
    CLUES = "CLUES",
    STATISTICS = "STATISTICS",
    SETTINGS = "SETTINGS"
}

export type CellBorder = [top: boolean, right: boolean, bottom: boolean, left: boolean];

export enum CellEffect {
    CIRCLE
}

export interface CrosswordCell {
    type: CellType.LETTER | CellType.BLOCK;
    borders: CellBorder;
    content: string;
    effects: CellEffect[];
    notes: string;
    clue?: string;
    backgroundColor?: string;
    textColor?: string;
}

export interface MetadataCell {
    warning: boolean;
    number?: number;
    cell: CrosswordCell;
}

export type CrosswordDocument = {
    cells: CrosswordCell[];
    width: number;
    height: number;
    title: string;
};
