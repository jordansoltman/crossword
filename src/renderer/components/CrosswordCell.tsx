import React from "react";
import classnames from "classnames";
import styles from "./CrosswordCell.scss";
import { CellType, CrosswordCell } from "../types";
import Textfit from "react-textfit";

interface CrosswordCellProps {
    cell: CrosswordCell;
    warning: boolean;
    selected: boolean;
    selectedWord: boolean;
    number?: number;
    onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function (props: CrosswordCellProps): JSX.Element {
    let className = null;
    if (props.cell.type === CellType.BLOCK) {
        className = styles.block;
    } else if (props.selected) {
        className = styles.selected;
    } else if (props.selectedWord) {
        className = styles.selectedWord;
    } else if (props.warning) {
        className = styles.warning;
    }
    return (
        <div
            role="button"
            className={classnames(styles.CrosswordCell, className)}
            onClick={props.onClick}
        >
            {props.number ? <div className={styles.number}>{props.number}</div> : null}
            {props.cell.content.length === 1 ? (
                <div className={styles.content}>{props.cell.content}</div>
            ) : (
                <Textfit mode="single">{props.cell.content}</Textfit>
            )}
        </div>
    );
}
