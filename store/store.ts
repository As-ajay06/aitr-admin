// import node module libraries
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

//import required reducers
import appReducer from "./slices/appSlice";
import departmentReducer from "./slices/departmentSlice"
import eventGrantReducer from "../app/api/redux/department/eventGrantSlice"

// todo: after completing this , see here if this can be optimized or not.
// todo: learn redux , and it's coresponding terms

const store = configureStore({
  reducer: {
    app: appReducer,
    department: departmentReducer,
    eventGrant: eventGrantReducer,
  },
});


// types for hooks

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
