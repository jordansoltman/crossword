import React from "react";
import classnames from "classnames";
import styles from "./CrosswordCell.scss";
import { CellType, CrosswordCell } from "../types";

interface CrosswordCellProps {
    cell: CrosswordCell;
    warning: boolean;
    number?: number;
    onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function (props: CrosswordCellProps): JSX.Element {
    return (
        <div
            role="button"
            className={classnames(styles.CrosswordCell, {
                [styles.block]: props.cell.type === CellType.BLOCK,
                [styles.warning]: props.warning
            })}
            onClick={props.onClick}
        >
            {props.number ? (
                <div className={styles["CrosswordCell-number"]}>{props.number}</div>
            ) : null}
        </div>
    );
}
