import React from "react";
import ToolButton from "./ToolButton";
import style from "./Toolbar.scss";
import colorScheme from "../theme";
import CreateIcon from "@material-ui/icons/Create";
import StopIcon from "@material-ui/icons/Stop";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SymmetryMode, Tool } from "../types";
import { setBlockToolSymmetry, setTool } from "../redux/slices/userinterfaceSlice";

export default function Toolbar(): JSX.Element {
    const dispatch = useAppDispatch();
    const tool = useAppSelector((state) => state.userInterface.activeTool);
    const symmetry = useAppSelector((state) => state.userInterface.blockToolSymmetry);
    console.log(tool);
    return (
        <div
            className={style.Toolbar}
            style={{ backgroundColor: colorScheme.toolbar.backgroundColor }}
        >
            <Button
                variant="contained"
                color={tool === Tool.POINTER ? "primary" : "default"}
                onClick={() => {
                    dispatch(setTool(Tool.POINTER));
                }}
            >
                <CreateIcon />
            </Button>
            <Button
                variant="contained"
                color={tool === Tool.BLOCK ? "primary" : "default"}
                onClick={() => {
                    console.log("hi");
                    dispatch(setTool(Tool.BLOCK));
                }}
            >
                <StopIcon />
            </Button>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={symmetry}
                    onChange={(ev) =>
                        dispatch(setBlockToolSymmetry(ev.target.value as SymmetryMode))
                    }
                >
                    <MenuItem value={SymmetryMode.NONE}>None</MenuItem>
                    <MenuItem value={SymmetryMode.ROTATIONAL}>Rotational</MenuItem>
                    <MenuItem value={SymmetryMode.HORIZONAL}>Horizontal</MenuItem>
                    <MenuItem value={SymmetryMode.VERTICAL}>Vertical</MenuItem>
                </Select>
            </FormControl>
            {/* <ToolButton
                backgroundColor={colorScheme.toolbar.button.backgroundColor}
                color={colorScheme.toolbar.button.color}
            >
                <CreateIcon style={{ color: colorScheme.toolbar.button.color }} />
            </ToolButton> */}
        </div>
    );
}
