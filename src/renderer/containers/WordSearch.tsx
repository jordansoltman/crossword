import {
    Button,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import DictionaryService, { DictionarySearchResult } from "../services/DictionaryService";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { debounce } from "lodash";
import { setDictionarySearch } from "../redux/slices/userinterfaceSlice";

export default function WordSearch(props: { dictionarySevice: DictionaryService }): JSX.Element {
    const dispatch = useAppDispatch();
    const ui = useAppSelector((state) => state.userInterface);
    const [searchResults, setSearchResults] = useState<DictionarySearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const debounced = useCallback(
        debounce((search, regex) => {
            setLoading(true);
            const results = props.dictionarySevice.search(search, regex);
            setLoading(false);
            setSearchResults(results);
        }, 500),
        []
    );

    useEffect(() => {
        debounced(ui.dictionarySearch, ui.dictionarySearchRegex);
    }, [ui.dictionarySearch, ui.dictionarySearchRegex]);

    return (
        <div style={{ height: "100vh" }}>
            <Input
                value={ui.dictionarySearch}
                onChange={(ev) => dispatch(setDictionarySearch(ev.target.value))}
            />
            <div style={{ overflow: "scroll", height: "100%" }}>
                <List dense={true}>
                    {searchResults.map((result) => {
                        return (
                            <ListItem key={result.word}>
                                <ListItemText
                                    style={{ color: "white" }}
                                    primary={result.word}
                                    secondary={result.dictionaries.join(", ")}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <CallMadeIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </div>
    );
}
