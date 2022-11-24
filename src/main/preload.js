/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer, remote } = require("electron");
const dialog = remote.dialog;
const app = remote.app;
const fs = require("fs");
const path = require("path");
const sanitize = require("sanitize-filename");

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        myPing() {
            ipcRenderer.send("ipc-example", "ping");
        },
        on(channel, func) {
            const validChannels = ["ipc-example"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        once(channel, func) {
            const validChannels = ["ipc-example"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.once(channel, (event, ...args) => func(...args));
            }
        }
    },
    files: {
        async openDialog() {
            return dialog.showOpenDialog({ properties: ["openFile"] });
        },
        openFile(file) {
            return fs.readFileSync(file, "utf-8");
        },
        openDictionary(file) {
            const userDataPath = app.getPath("userData");
            const dictDirectPath = path.join(userDataPath, "dictionaries");
            const dictPath = path.join(dictDirectPath, file);
            if (fs.existsSync(dictPath)) {
                const contents = fs.readFileSync(dictPath, "utf-8");
                try {
                    return JSON.parse(contents);
                } catch (err) {
                    throw new Error("Could not parse dictionary!");
                }
            }
            throw new Error("Cannot open file!");
        },
        getDictionaryPaths() {
            const userDataPath = app.getPath("userData");
            const dictPath = path.join(userDataPath, "dictionaries");
            const directoryContents = fs.readdirSync(dictPath);
            return directoryContents.filter((file) => file.endsWith(".xwdict"));
        },
        saveDictionary(dictionary) {
            const userDataPath = app.getPath("userData");
            const dictPath = path.join(userDataPath, "dictionaries");
            // Make the dictionary path if it doesn't exist
            if (!fs.existsSync(dictPath)) {
                fs.mkdirSync(dictPath, { recursive: true });
            }

            const sanitizedDictionaryName = `${sanitize(dictionary.name)}.xwdict`;
            const contents = JSON.stringify(dictionary);
            fs.writeFileSync(path.join(dictPath, sanitizedDictionaryName), contents);
        }
    }
});
