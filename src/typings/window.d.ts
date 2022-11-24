import { Dictionary } from "../renderer/types";

export {};

declare global {
    interface Window {
        electron: {
            files: {
                openDictionary: (file: string) => Dictionary;
                getDictionaryPaths: () => string[];
                saveDictionary: (dictionary: Dictionary) => void;
                openFile: (file: string) => string;
                openDialog: () => Promise<Electron.OpenDialogReturnValue>;
            };
        };
    }
}
