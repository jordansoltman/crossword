import { Tab, Tabs, withStyles } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DictionaryService from "../services/DictionaryService";
import AddDictionaryDialog from "../components/AddDictionaryDialog";
import DictionaryManager from "./DictionaryManager";

const StyledTabs: any = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: "#635ee7"
        }
    }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab: any = withStyles((theme) => ({
    root: {
        minWidth: 0,
        textTransform: "none",
        color: "#fff",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        "&:focus": {
            opacity: 1
        }
    }
}))((props) => <Tab disableRipple {...props} />);

export default function RightBar(props: { dictionaryService: DictionaryService }): JSX.Element {
    return (
        <div className="">
            <StyledTabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="auto"
                variant="scrollable"
                onChange={(val: any, newValue: number) => {
                    console.log(val.index, newValue);
                }}
                aria-label="disabled tabs example"
            >
                <StyledTab label="Dictionaries" />
                <StyledTab label="Disabled" />
                <StyledTab label="Active" />
            </StyledTabs>
            <DictionaryManager dictionaryService={props.dictionaryService} />
        </div>
    );
}
