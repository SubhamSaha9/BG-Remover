import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    credit: false,
};

const creditSlice = createSlice({
    name: "credit",
    initialState: initialState,
    reducers: {
        setCredit(state, value) {
            state.credit = value.payload;
        }
    },
});

export const { setCredit } = creditSlice.actions;
export default creditSlice.reducer;