import { DictionaryProvider } from "../services/DictionaryService";
import { Dictionary } from "../types";

export default class FileDictionaryProvider implements DictionaryProvider {
    getDictionaries(): Dictionary[] {
        const dictionaryPaths = window.electron.files.getDictionaryPaths();
        return dictionaryPaths.map((path) => {
            return window.electron.files.openDictionary(path);
        });
    }
}
