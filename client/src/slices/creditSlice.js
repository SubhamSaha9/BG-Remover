import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    credit: false,
    image: false,
    resultImage: false,
};

const creditSlice = createSlice({
    name: "credits",
    initialState: initialState,
    reducers: {
        setCredit(state, value) {
            state.credit = value.payload;
        },
        setImage(state, value) {
            state.image = value.payload;
        },
        setResultImage(state, value) {
            state.resultImage = value.payload;
        }
    },
});

export const { setCredit, setImage, setResultImage } = creditSlice.actions;
export default creditSlice.reducer;