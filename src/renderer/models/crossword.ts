import { CellType, CrosswordDocument, MetadataCell, Orientation, SymmetryMode } from "../types";
import { xPosFromIndex, xyFromIndex, xyToIndex, yPosFromIndex } from "../util/grid";
import _ from "lodash";

const MINIMUM_WORD_SIZE = 3;

/**
 * Returns the next cell to the right if it's not over the edge, and it's not a block
 * @param document
 * @param index
 * @param orientation
 * @returns
 */
export function nextCellIndex(
    document: CrosswordDocument,
    index: number,
    orientation: Orientation
): number {
    const [x, y] = xyFromIndex(index, document.width);
    // Look to the right
    if (orientation === Orientation.HORIZONTAL) {
        if (x === document.width - 1 || document.cells[index + 1].type === CellType.BLOCK)
            return index;
        return index + 1;
    } else {
        // Look down
        if (
            y === document.height - 1 ||
            document.cells[index + document.width].type === CellType.BLOCK
        )
            return index;
        return index + document.width;
    }
}

export function getWordValues(
    document: CrosswordDocument,
    index: number,
    orientation: Orientation
): string[] {
    const indexes = findWordCellIndexes(index, orientation, document);
    console.log(indexes);
    return indexes.map((index) => document.cells[index].content);
}

export function previousCellIndex(
    document: CrosswordDocument,
    index: number,
    orientation: Orientation
): number {
    const [x, y] = xyFromIndex(index, document.width);
    // Look to the left
    if (orientation === Orientation.HORIZONTAL) {
        if (x === 0 || document.cells[index - 1].type === CellType.BLOCK) return index;
        return index - 1;
    } else {
        // Look down
        if (y === 0 || document.cells[index - document.width].type === CellType.BLOCK) return index;
        return index - document.width;
    }
}

/**
 * Finds the symmetrical indexed pair.
 * @param document The crossword document
 * @param symmetry The symmetry mode
 * @param index The index to find the symmetrical pair of
 * @returns the index of the symmetrical pair or -1 if the symmetry mode is none.
 */
export function calculateSymmetricCellIndex(
    document: CrosswordDocument,
    symmetry: SymmetryMode,
    index: number
): number {
    const [x, y] = xyFromIndex(index, document.width);
    switch (symmetry) {
        case SymmetryMode.NONE:
            return -1;
        case SymmetryMode.ROTATIONAL:
            return document.width * document.height - index - 1;
        case SymmetryMode.HORIZONTAL:
            return xyToIndex(document.width - x - 1, y, document.width);
        case SymmetryMode.VERTICAL:
            return xyToIndex(x, document.height - y - 1, document.width);
    }
}

/**
 * Finds if a cell is against a wall (an edge or a BLOCK cell) on the top and left sides
 * @param index
 * @param document
 * @returns [topBlocked, leftBlocked]
 */
function findAdjacentWalls(
    index: number,
    document: CrosswordDocument
): [topBlocked: boolean, leftBlocked: boolean] {
    const cell = document.cells[index];
    let topBlocked = false;
    let leftBlocked = false;
    if (cell.type !== CellType.BLOCK) {
        // It's along a top edge, or a left edge
        if (index < document.width) {
            topBlocked = true;
        }
        if (index % document.width === 0) {
            leftBlocked = true;
        }

        // Or if it's blocked on top or to the left by a BLOCK
        if (!topBlocked && document.cells[index - document.width].type === CellType.BLOCK) {
            topBlocked = true;
        }
        if (!leftBlocked && document.cells[index - 1].type === CellType.BLOCK) {
            leftBlocked = true;
        }
    }
    return [topBlocked, leftBlocked];
}

/**
 * Returns an array of indexes that define a word
 * @param index The index to start the search from
 * @param orientation The orientation to search
 * @param document The document to search
 * @returns An array of indexes
 */
export function findWordCellIndexes(
    index: number,
    orientation: Orientation,
    document: CrosswordDocument
): number[] {
    const indexes = [];
    const cells = document.cells;
    if (orientation === Orientation.HORIZONTAL) {
        const x = xPosFromIndex(index, document.width);
        // Search left
        for (let i = 0; i <= x; i++) {
            if (cells[index - i].type === CellType.BLOCK) break;
            indexes.push(index - i);
        }
        // Search right
        for (let i = 0; i < document.width - x; i++) {
            if (cells[index + i].type === CellType.BLOCK) break;
            indexes.push(index + i);
        }
    } else {
        const y = yPosFromIndex(index, document.width);
        // Search up
        for (let i = 0; i <= y; i++) {
            if (cells[index - i * document.width].type === CellType.BLOCK) break;
            indexes.push(index - i * document.width);
        }
        // Search down
        for (let i = 0; i < document.height - y; i++) {
            if (cells[index + i * document.width].type === CellType.BLOCK) break;
            indexes.push(index + i * document.width);
        }
    }
    return _.uniq(indexes).sort((a, b) => a - b);
}

export function calculateCellMetadata(
    document: CrosswordDocument,
    selectedCellIndex: number | null,
    selectionOrientation: Orientation
): MetadataCell[] {
    const { width, height } = document;
    let number = 0;

    const metadataCells = document.cells.map<MetadataCell>((cell) => {
        return {
            cell,
            warning: false,
            selected: false,
            wordSelected: false
        };
    });

    document.cells.forEach((_cell, index) => {
        const x = index % width;
        const y = Math.floor(index / width);

        if (selectedCellIndex !== null && index === selectedCellIndex) {
            metadataCells[index].selected = true;
            const wordCellIndexes = findWordCellIndexes(index, selectionOrientation, document);
            for (const wordCellIndex of wordCellIndexes) {
                metadataCells[wordCellIndex].wordSelected = true;
            }
        }

        const [topBlocked, leftBlocked] = findAdjacentWalls(index, document);
        // If it's not blocked on the top or left, we don't care about it
        if (!topBlocked && !leftBlocked) return;

        number += 1;
        metadataCells[index].number = number;

        let acrossWarning = false;
        let downWarning = false;

        if (x + MINIMUM_WORD_SIZE > width && leftBlocked) {
            acrossWarning = true;
        }

        if (y + MINIMUM_WORD_SIZE > height && topBlocked) {
            downWarning = true;
        }

        for (let i = 0; i < MINIMUM_WORD_SIZE; i += 1) {
            const downCell = document.cells[index + width * i];
            const rightCell = document.cells[index + i];
            if (topBlocked && (!downCell || (downCell && downCell.type === CellType.BLOCK))) {
                downWarning = true;
            }
            if (leftBlocked && (!rightCell || (rightCell && rightCell.type === CellType.BLOCK))) {
                acrossWarning = true;
            }
        }

        if (acrossWarning) {
            for (let i = 0; i < Math.min(width - x, MINIMUM_WORD_SIZE); i += 1) {
                const adjacentCell = metadataCells[index + i];
                if (!adjacentCell || adjacentCell.cell.type === CellType.BLOCK) break;
                adjacentCell.warning = true;
            }
        }

        if (downWarning) {
            for (let i = 0; i < MINIMUM_WORD_SIZE; i += 1) {
                const adjacentCell = metadataCells[index + width * i];
                if (!adjacentCell || adjacentCell.cell.type === CellType.BLOCK) break;
                adjacentCell.warning = true;
            }
        }
    });

    return metadataCells;
}
