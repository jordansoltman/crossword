import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const store = configureStore({
    reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
if (typeof module.hot !== "undefined") {
    // @ts-ignore
    module.hot.accept("./reducers", () =>
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        store.replaceReducer(require("./reducers").rootReducer)
    );
}

export default store;
