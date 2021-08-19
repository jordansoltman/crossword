import React from "react";
import classnames from "classnames";
import "./CrosswordCell.scss";
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
            className={classnames("CrosswordCell", {
                block: props.cell.type === CellType.BLOCK,
                warning: props.warning
            })}
            onClick={props.onClick}
        >
            {props.number ? <div className="CrosswordCell-number">{props.number}</div> : null}
        </div>
    );
}
