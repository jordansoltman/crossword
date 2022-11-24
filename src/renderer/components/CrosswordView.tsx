import * as React from "react";
import CrosswordCell from "./CrosswordCell";
import { MetadataCell } from "../types";
import styles from "./CrosswordView.scss";

export default function CrosswordView(props: {
    width: number;
    height: number;
    cells: MetadataCell[];
    onCellClick: (cellIndex: number) => void;
}): JSX.Element {
    const { width, height } = props;
    const rows = [];

    for (let i = 0; i < height; i += 1) {
        const row = [];
        for (let j = 0; j < width; j += 1) {
            const cellIndex = i * width + j;
            const cell = props.cells[cellIndex];
            row.push(
                <CrosswordCell
                    warning={cell.warning}
                    number={cell.number}
                    selected={cell.selected}
                    selectedWord={cell.wordSelected}
                    cell={cell.cell}
                    key={`${i}-${j}`}
                    onClick={() => props.onCellClick(cellIndex)}
                />
            );
        }
        rows.push(row);
    }

    return (
        <div className={styles.CrosswordView}>
            {rows.map((row, idx) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={idx} className={styles["CrosswordView-row"]}>
                        {row}
                    </div>
                );
            })}
        </div>
    );
}
