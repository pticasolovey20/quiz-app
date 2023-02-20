import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import questionSlice from "./slices/questionSlice";

const rootReducer = combineReducers({ questionSlice });

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
