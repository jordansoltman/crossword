import { Grid } from "@material-ui/core";
import * as React from "react";
import GridView from "../features/grid_view/routes/GridView";
import RightBar from "../containers/RightBar";
import WordSearch from "../containers/WordSearch";
import { useKeyboardHandler } from "../hooks/keyboard";
import DictionaryService from "../services/DictionaryService";
import colorScheme from "../theme";
import Toolbar from "./Toolbar";

export default function Main(props: { dictionaryService: DictionaryService }): JSX.Element {
    const onKeyPress = useKeyboardHandler();

    return (
        <div
            style={{ height: "100%" }}
            onKeyDown={(ev) => {
                if ((ev.target as HTMLElement).tagName.toUpperCase() === "INPUT") return;
                // FIXME, this might break things!
                ev.preventDefault();
                onKeyPress(ev.key, ev.code, ev.metaKey, ev.shiftKey, ev.ctrlKey, ev.altKey);
            }}
            // We have to do this to get the focus on the div
            tabIndex={-1}
        >
            <Grid
                container
                style={{ backgroundColor: colorScheme.sidebarBackgroundColor, height: "100%" }}
            >
                <Grid item xs={3} style={{ backgroundColor: colorScheme.sidebarBackgroundColor }}>
                    <WordSearch dictionarySevice={props.dictionaryService} />
                </Grid>
                <Grid item xs={6} style={{ backgroundColor: colorScheme.centerBackgroundColor }}>
                    <Toolbar />
                    <GridView />
                </Grid>
                <Grid item xs={3} style={{ backgroundColor: colorScheme.sidebarBackgroundColor }}>
                    <RightBar dictionaryService={props.dictionaryService} />
                </Grid>
            </Grid>
        </div>
    );
}
