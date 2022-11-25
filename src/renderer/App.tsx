import { Provider } from "react-redux";
import React from "react";
import store from "./redux/store";
import Application from "./containers/Application";
import { ThemeProvider } from "@mui/material/styles";
import { materialUITheme } from "./theme";
// import { ipcRenderer } from "electron";

// ipcRenderer.on("menu", (ev, args) => {
//     console.log(ev, args);
// });

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={materialUITheme}>
                <Application />
            </ThemeProvider>
        </Provider>
    );
}
