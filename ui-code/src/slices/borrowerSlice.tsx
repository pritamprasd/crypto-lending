import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedLender: null,
    borrowTerms: {},
    borrowState: null,
    initialOffer: null,
    finalOffer: null,
    deal: null
};

export const authSlice = createSlice({
    name: "borrowers",
    initialState,
    reducers: {
        setSelectedLender: (state, action) => {
            state.selectedLender = action.payload;
        },
        setInitialOffer: (state, action) => {
            state.initialOffer = action.payload;
        },
        setFinalOffer: (state, action) => {
            state.finalOffer = action.payload;
        },
    },
});

export const { setSelectedLender, setInitialOffer, setFinalOffer } = authSlice.actions;

export default authSlice.reducer;
