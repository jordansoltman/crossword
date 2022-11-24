import React from "react";
import CrosswordView from "../components/CrosswordView";
import { useCellClickHandler } from "../hooks/crossword";
import { calculateCellMetadata } from "../models/crossword";
import { useAppSelector } from "../redux/hooks";

export default function CrosswordContainer(): JSX.Element {
    const document = useAppSelector((state) => state.document.present);
    const userInterface = useAppSelector((state) => state.userInterface);
    if (!document) return <></>;

    const metaDataCells = calculateCellMetadata(
        document,
        userInterface.activeCellIndex,
        userInterface.activeCellOrientation
    );
    const cellClickHandler = useCellClickHandler();

    return (
        <CrosswordView
            width={document.width}
            height={document.height}
            cells={metaDataCells}
            onCellClick={cellClickHandler}
        />
    );
}
