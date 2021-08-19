import React from "react";
import { useSelector } from "react-redux";
import Crossword from "../components/Crossword";
import { RootState } from "../redux/reducers";
import { DocumentState } from "../redux/reducers/documentReducer";

export default function CrosswordContainer() {
    const document = useSelector<RootState, DocumentState>((state) => state.document.present);

    return <Crossword document={document!} minimumSpaceWarning={3} />;
}
