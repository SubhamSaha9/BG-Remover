import { combineReducers } from "@reduxjs/toolkit";
import creditSlice from "../slices/creditSlice"

const rootReducer = combineReducers({
    credit: creditSlice,
});

export default rootReducer;