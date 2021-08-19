import { CellType, CrosswordDocument, MetadataCell } from "../types";

const MINIMUM_WORD_SIZE = 3;

export function calculateCellMetadata(document: CrosswordDocument) {
    const { width, height } = document;
    let number = 0;

    const metadataCells = document.cells.map<MetadataCell>((cell) => {
        return {
            cell,
            warning: false
        };
    });

    document.cells.forEach((cell, index) => {
        const x = index % width;
        const y = Math.floor(index / width);

        /**
         * First determine if this is an edge cell that should have a number by looking and seeing if it's
         * along an edge, or along a block cell
         */
        let topBlocked = false;
        let leftBlocked = false;
        let isNumberCell = false;

        if (cell.type !== CellType.BLOCK) {
            // It's along a top edge, or a left edge
            if (index < width) {
                topBlocked = true;
            }
            if (index % width === 0) {
                leftBlocked = true;
            }

            // Or if it's blocked on top or to the left by a BLOCK
            if (!topBlocked && document.cells[index - width].type === CellType.BLOCK) {
                topBlocked = true;
            }
            if (!leftBlocked && document.cells[index - 1].type === CellType.BLOCK) {
                leftBlocked = true;
            }

            if (topBlocked || leftBlocked) {
                isNumberCell = true;
            }
        }

        /* eslint-disable no-param-reassign */
        if (isNumberCell) {
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
                if (
                    leftBlocked &&
                    (!rightCell || (rightCell && rightCell.type === CellType.BLOCK))
                ) {
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
        }
    });

    return metadataCells;
}
