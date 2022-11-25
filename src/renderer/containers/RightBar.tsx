import { Tab, Tabs } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DictionaryService from "../services/DictionaryService";
import AddDictionaryDialog from "../components/AddDictionaryDialog";
import DictionaryManager from "./DictionaryManager";

export default function RightBar(props: { dictionaryService: DictionaryService }): JSX.Element {
    return (
        <div className="">
            <Tabs
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
                <Tab label="Dictionaries" />
                <Tab label="Disabled" />
                <Tab label="Active" />
            </Tabs>
            <DictionaryManager dictionaryService={props.dictionaryService} />
        </div>
    );
}
