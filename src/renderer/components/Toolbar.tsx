import React from "react";
import ToolButton from "./ToolButton";
import style from "./Toolbar.scss";
import colorScheme from "../theme";
// import CreateIcon from "@material-ui/icons/Create";
// import StopIcon from "@material-ui/icons/Stop";
import CreateIcon from "@mui/icons-material/Create";
import StopIcon from "@mui/icons-material/Stop";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SymmetryMode, Tool } from "../types";
import { setBlockToolSymmetry, setTool } from "../redux/slices/userinterfaceSlice";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// const StyledToggleButtonGroup = styled()(({ theme }) => ({
//     "& .MuiToggleButtonGroup-grouped": {
//         margin: theme.spacing(0.5),
//         border: 0,
//         "&.Mui-disabled": {
//             border: 0
//         },
//         "&:not(:first-of-type)": {
//             borderRadius: theme.shape.borderRadius
//         },
//         "&:first-of-type": {
//             borderRadius: theme.shape.borderRadius
//         }
//     }
// }));

import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import TextIcon from "@mui/icons-material/FontDownload";
import SquareIcon from "@mui/icons-material/Square";
import HighlightIcon from "@mui/icons-material/HighlightAlt";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        margin: theme.spacing(0.5),
        border: 0,
        "&.Mui-disabled": {
            border: 0
        },
        "&:not(:first-of-type)": {
            borderRadius: theme.shape.borderRadius
        },
        "&:first-of-type": {
            borderRadius: theme.shape.borderRadius
        }
    }
}));

export default function MainToolbar(): JSX.Element {
    const [alignment, setAlignment] = React.useState("left");
    const [formats, setFormats] = React.useState(() => ["italic"]);
    const dispatch = useAppDispatch();
    const tool = useAppSelector((state) => state.userInterface.activeTool);
    const symmetry = useAppSelector((state) => state.userInterface.blockToolSymmetry);

    const handleToolChange = (event: React.MouseEvent<HTMLElement>, newAlignment: Tool) => {
        dispatch(setTool(newAlignment));
    };

    return (
        <div>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: "wrap"
                }}
            >
                <StyledToggleButtonGroup
                    size="small"
                    value={tool}
                    exclusive
                    onChange={handleToolChange}
                    aria-label="tool selection"
                >
                    <ToggleButton value={Tool.POINTER} aria-label="left aligned">
                        <TextIcon />
                    </ToggleButton>
                    <ToggleButton value={Tool.BLOCK} aria-label="centered">
                        <SquareIcon />
                    </ToggleButton>
                    <ToggleButton value={Tool.SELECT} aria-label="right aligned">
                        <HighlightIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            </Paper>
        </div>
    );
}

export function Toolbar(): JSX.Element {
    const dispatch = useAppDispatch();
    const tool = useAppSelector((state) => state.userInterface.activeTool);
    const symmetry = useAppSelector((state) => state.userInterface.blockToolSymmetry);
    console.log(tool);
    return (
        <>
            <div
                className={style.Toolbar}
                style={{ backgroundColor: colorScheme.toolbar.backgroundColor }}
            >
                <Button
                    variant="contained"
                    color={tool === Tool.POINTER ? "primary" : "inherit"}
                    onClick={() => {
                        dispatch(setTool(Tool.POINTER));
                    }}
                >
                    <CreateIcon />
                </Button>
                <Button
                    variant="contained"
                    color={tool === Tool.BLOCK ? "primary" : "inherit"}
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
        </>
    );
}
