import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import profileReducer from "./features/profileSlice";
import educationReducer from "./features/educationSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        education: educationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
