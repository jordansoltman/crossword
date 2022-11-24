import { RestaurantRounded } from "@material-ui/icons";
import {
    findWordCellIndexes,
    getWordValues as getCellValues,
    nextCellIndex,
    previousCellIndex
} from "../models/crossword";
import { setCellContent } from "../redux/actions/documentActions";
import {
    setActiveCellIndex,
    setActiveCellOrientation,
    setDictionarySearch,
    setTool
} from "../redux/actions/userInterfaceActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CellType, Orientation, Tool } from "../types";
import * as KeyCode from "keycode-js";

export function useKeyboardHandler(): (
    key: string,
    keyCode: string,
    meta: boolean,
    shift: boolean,
    control: boolean,
    option: boolean
) => void {
    const userInterface = useAppSelector((state) => state.userInterface);
    const document = useAppSelector((state) => state.document.present);
    const dispatch = useAppDispatch();

    const onKeyPress = (
        key: string,
        keyCode: string,
        meta: boolean,
        shift: boolean,
        control: boolean,
        option: boolean
    ): void => {
        console.log(key);
        if (!document) return;

        // Everything past this point must have an active cell index and be operating on a letter
        if (
            userInterface.activeCellIndex === null ||
            document.cells[userInterface.activeCellIndex].type !== CellType.LETTER
        )
            return;

        // If non of the modifier keys was pressed, and the key length is one we must be trying to
        // change the value of cell
        if (!meta && !control && !option && key.length === 1) {
            // If the space bar is hit, we will skip over this square
            if (keyCode !== KeyCode.CODE_SPACE)
                dispatch(setCellContent(userInterface.activeCellIndex, key));
            dispatch(
                setActiveCellIndex(
                    nextCellIndex(
                        document,
                        userInterface.activeCellIndex,
                        userInterface.activeCellOrientation
                    )
                )
            );
            return;
        }

        if (keyCode === KeyCode.CODE_DELETE || keyCode === KeyCode.CODE_BACK_SPACE) {
            dispatch(setCellContent(userInterface.activeCellIndex, ""));
            dispatch(
                setActiveCellIndex(
                    previousCellIndex(
                        document,
                        userInterface.activeCellIndex,
                        userInterface.activeCellOrientation
                    )
                )
            );
        }

        /**
         * CMD+F - search for acceptable words
         */
        if (keyCode === KeyCode.CODE_F && meta) {
            const cellValues = getCellValues(
                document,
                userInterface.activeCellIndex,
                userInterface.activeCellOrientation
            );
            // FIXME: check for REBUS
            const search = cellValues.map((value) => (value.length === 0 ? "?" : value)).join("");
            dispatch(setDictionarySearch(search));
        }

        /**
         * CMD+C - clear the word
         */
        if (keyCode === KeyCode.CODE_C && meta) {
            console.log("CODE C");
            const indexes = findWordCellIndexes(
                userInterface.activeCellIndex,
                userInterface.activeCellOrientation,
                document
            );
            for (const index of indexes) {
                dispatch(setCellContent(index, ""));
            }
        }

        /**
         * Handle horizontal orientation change
         */
        if (keyCode === KeyCode.CODE_RIGHT || keyCode === KeyCode.CODE_LEFT) {
            dispatch(setActiveCellOrientation(Orientation.HORIZONTAL));
        }

        /**
         * Handle vertical orientation change
         */
        if (keyCode === KeyCode.CODE_UP || keyCode === KeyCode.CODE_DOWN) {
            dispatch(setActiveCellOrientation(Orientation.VERTICAL));
        }

        /**
         * Move left
         */
        if (keyCode === KeyCode.CODE_H && control) {
            dispatch(
                setActiveCellIndex(
                    previousCellIndex(
                        document,
                        userInterface.activeCellIndex,
                        Orientation.HORIZONTAL
                    )
                )
            );
        }

        /**
         * Move right
         */
        if (keyCode === KeyCode.CODE_L && control) {
            dispatch(
                setActiveCellIndex(
                    nextCellIndex(document, userInterface.activeCellIndex, Orientation.HORIZONTAL)
                )
            );
        }

        /** Move up */
        if (keyCode === KeyCode.CODE_K && control) {
            dispatch(
                setActiveCellIndex(
                    previousCellIndex(document, userInterface.activeCellIndex, Orientation.VERTICAL)
                )
            );
        }

        /**
         * Move down
         */
        if (keyCode === KeyCode.CODE_J && control) {
            dispatch(
                setActiveCellIndex(
                    nextCellIndex(document, userInterface.activeCellIndex, Orientation.VERTICAL)
                )
            );
        }

        /**
         * switch the orientation
         */
        if (keyCode === KeyCode.CODE_O && control) {
            dispatch(
                setActiveCellOrientation(
                    userInterface.activeCellOrientation === Orientation.VERTICAL
                        ? Orientation.HORIZONTAL
                        : Orientation.VERTICAL
                )
            );
        }

        if (keyCode === KeyCode.CODE_B && meta) {
            dispatch(setTool(Tool.BLOCK));
        }

        if (keyCode === KeyCode.CODE_P && meta) {
            dispatch(setTool(Tool.POINTER));
        }
    };

    return onKeyPress;
}
