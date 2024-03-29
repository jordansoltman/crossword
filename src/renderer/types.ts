export enum CellType {
    LETTER = "LETTER",
    BLOCK = "BLOCK"
}

export enum Tool {
    POINTER = "POINTER",
    BLOCK = "BLOCK",
    SELECT = "SELECT"
}

export enum FileType {
    TXT = "TXT"
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
    HORIZONTAL = "HORIZONTAL",
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
    selected: boolean;
    wordSelected: boolean;
    number?: number;
    cell: CrosswordCell;
}

export interface CrosswordDocument {
    cells: CrosswordCell[];
    width: number;
    height: number;
    title: string;
}

export interface DictionaryEntry {
    word: string;
}

export interface Dictionary {
    name: string;
    entries: DictionaryEntry[];
}
