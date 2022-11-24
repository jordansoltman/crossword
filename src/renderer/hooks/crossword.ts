import { calculateSymmetricCellIndex } from "../models/crossword";
import { setCellType } from "../redux/actions/documentActions";
import {
    setActiveCellIndex,
    setActiveCellOrientation
} from "../redux/actions/userInterfaceActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CellType, Orientation, Tool } from "../types";

export function useCellClickHandler(): (index: number) => void {
    const dispatch = useAppDispatch();
    const interfaceState = useAppSelector((state) => state.userInterface);
    const documentState = useAppSelector((state) => state.document);

    const handleCellClick = (index: number): void => {
        const document = documentState.present;
        if (!document) return;

        const cell = document.cells[index];

        if (interfaceState.activeTool === Tool.BLOCK) {
            const newType = cell.type === CellType.LETTER ? CellType.BLOCK : CellType.LETTER;

            const symmetricalIndex = calculateSymmetricCellIndex(
                document,
                interfaceState.blockToolSymmetry,
                index
            );

            dispatch(setCellType(index, newType));
            if (symmetricalIndex >= 0) {
                dispatch(setCellType(symmetricalIndex, newType));
            }
        } else if (interfaceState.activeTool === Tool.POINTER) {
            // The cell that was already clicked was just clicked again
            // so we will rotate the selection
            if (interfaceState.activeCellIndex === index) {
                dispatch(
                    setActiveCellOrientation(
                        interfaceState.activeCellOrientation === Orientation.HORIZONTAL
                            ? Orientation.VERTICAL
                            : Orientation.HORIZONTAL
                    )
                );
            } else {
                dispatch(setActiveCellIndex(index));
            }
        }
    };

    return handleCellClick;
}
