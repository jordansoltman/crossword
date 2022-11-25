import { createTheme } from "@mui/material";

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
    sidebarBackgroundColor: "#f5f5f5",
    centerBackgroundColor: "#fafafa",
    toolbar: {
        backgroundColor: "#323838",
        button: {
            backgroundColor: "#202020",
            color: "#6a6e6e"
        }
    }
};

export const materialUITheme = createTheme({
    palette: {}
});

export default theme;
