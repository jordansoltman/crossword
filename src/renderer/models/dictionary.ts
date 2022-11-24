import { Dictionary, FileType } from "../types";

/**
 * The txt format defines words as one line per word with no additional data
 */
function txtToDictionary(name: string, data: string): Dictionary {
    const dictionary: Dictionary = {
        name,
        entries: []
    };

    dictionary.entries = data.split(/\r\n|\r|\n/).map((word) => ({
        word: word.trim().toUpperCase()
    }));

    return dictionary;
}

export function dataToDictionary(name: string, fileType: FileType, data: string): Dictionary {
    switch (fileType) {
        case FileType.TXT:
            return txtToDictionary(name, data);
    }
}
