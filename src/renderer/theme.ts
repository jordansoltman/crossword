import { createTheme } from "@material-ui/core";

export interface ColorScheme {
    sidebarBackgroundColor: string;
    centerBackgroundColor: string;
    toolbar: {
        backgroundColor: string;
        button: {
            backgroundColor: string;
            color: string;
        };
    };
}

const theme: ColorScheme = {
    sidebarBackgroundColor: "#191b1b",
    centerBackgroundColor: "#252929",
    toolbar: {
        backgroundColor: "#323838",
        button: {
            backgroundColor: "#202020",
            color: "#6a6e6e"
        }
    }
};

export const materialUITheme = createTheme({
    palette: {
        type: "dark"
    }
});

export default theme;
