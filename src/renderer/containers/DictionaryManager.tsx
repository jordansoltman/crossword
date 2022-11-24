import {
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DictionaryService from "../services/DictionaryService";
import AddDictionaryDialog from "../components/AddDictionaryDialog";
import { dataToDictionary } from "../models/dictionary";
import { FileType } from "../types";

export default function DictionaryManager(props: { dictionaryService: DictionaryService }) {
    const [file, setFile] = useState("");
    return (
        <div>
            <List dense={true}>
                {props.dictionaryService.getDictionaryNames().map((name) => {
                    return (
                        <ListItem key={name}>
                            <ListItemText primary={name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <AddDictionaryDialog
                filename={file}
                import={async (name) => {
                    const data = await window.electron.files.openFile(file);

                    if (file.toUpperCase().endsWith(".TXT")) {
                        const dictionary = dataToDictionary(name, FileType.TXT, data);
                        window.electron.files.saveDictionary(dictionary);
                    }
                }}
                chooseFile={async () => {
                    const file = await window.electron.files.openDialog();
                    if (!file.canceled) {
                        setFile(file.filePaths[0]);
                    }
                }}
            />
        </div>
    );
}
