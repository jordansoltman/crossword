import { stringify } from "querystring";
import { Dictionary } from "../types";

export interface DictionarySearchResult {
    word: string;
    dictionaries: string[];
}

export default class DictionaryService {
    private dictionaryProvider: DictionaryProvider;

    private dictionaries: Dictionary[] = [];

    constructor(dictionaryProvider: DictionaryProvider) {
        this.dictionaryProvider = dictionaryProvider;
    }

    load(): void {
        this.dictionaries = this.dictionaryProvider.getDictionaries();
    }

    getDictionaryNames(): string[] {
        return this.dictionaries.map((dictoinary) => dictoinary.name);
    }

    search(term: string, regex: boolean): DictionarySearchResult[] {
        const results: Record<string, string[]> = {};

        let test: RegExp;
        if (regex) {
            test = new RegExp(term, "i");
        } else {
            test = new RegExp(`^${term.replaceAll("?", ".")}$`, "i");
        }

        console.log(test);

        this.dictionaries.forEach((dictionary) => {
            dictionary.entries
                .filter((entry) => test.test(entry.word))
                .forEach((entry) => {
                    if (!results[entry.word]) results[entry.word] = [];
                    results[entry.word].push(dictionary.name);
                });
        });

        return Object.entries(results)
            .map<DictionarySearchResult>(([word, dictionaries]) => ({
                word,
                dictionaries
            }))
            .sort((a, b) => a.word.localeCompare(b.word));
    }
}

export interface DictionaryProvider {
    getDictionaries: () => Dictionary[];
}
