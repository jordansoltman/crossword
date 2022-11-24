import { combineReducers } from "redux";

import { undoableDocumentReducer } from "./documentReducer";
import { userInterfaceReducer } from "./userInterfaceReducer";

export const rootReducer = combineReducers({
    document: undoableDocumentReducer,
    userInterface: userInterfaceReducer
});
