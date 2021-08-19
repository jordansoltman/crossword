import * as React from "react";
import CrosswordCell from "./CrosswordCell";
import { CrosswordDocument, CellType } from "../types";

import styles from "./Crossword.scss";
import { calculateCellMetadata } from "../models/crossword";
import { useAppDispatch } from "../redux/hooks";
import { setCellType } from "../redux/actions/documentActions";

export default function Crossword(props: {
    document: CrosswordDocument;
    minimumSpaceWarning: number | null;
}): JSX.Element {
    const { width, height } = props.document;
    const rows = [];

    const metaDataCells = calculateCellMetadata(props.document);

    const dispatch = useAppDispatch();

    for (let i = 0; i < height; i += 1) {
        const row = [];
        for (let j = 0; j < width; j += 1) {
            const cellIndex = i * width + j;
            const cell = metaDataCells[cellIndex];
            row.push(
                <CrosswordCell
                    warning={cell.warning}
                    number={cell.number}
                    cell={cell.cell}
                    key={`${i}-${j}`}
                    onClick={() => {
                        dispatch(setCellType(cellIndex, CellType.BLOCK));
                        dispatch(setCellType(width * height - cellIndex - 1, CellType.BLOCK));
                    }}
                />
            );
        }
        rows.push(row);
    }

    return (
        <div className={styles.Crossword}>
            {rows.map((row, idx) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={idx} className={styles["Crossword-row"]}>
                        {row}
                    </div>
                );
            })}
        </div>
    );
}
