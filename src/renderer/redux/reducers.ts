import { combineReducers } from "redux";

import documentReducer from "./slices/documentSlice";
import userInterfaceReducer from "./slices/userinterfaceSlice";

export default combineReducers({
    document: documentReducer,
    userInterface: userInterfaceReducer
});
