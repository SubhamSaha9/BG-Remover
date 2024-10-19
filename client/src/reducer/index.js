import { combineReducers } from "@reduxjs/toolkit";
import creditSlice from "../slices/creditSlice"

const rootReducer = combineReducers({
    credits: creditSlice,
});

export default rootReducer;