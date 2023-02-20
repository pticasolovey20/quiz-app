import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionSlice from "./slices/questionSlice";

const rootReducer = combineReducers({ questionSlice });

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
