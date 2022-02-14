import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    selectedBorrower: null,
    lendingTerms: {},
    lendingState: null,
    initialOffer: null,
    finalOffer: null,
    deal: null
};

export const authSlice = createSlice({
    name: "lenders",
    initialState,
    reducers: {
        setSelectedBorrower: (state, action) => {
            state.selectedBorrower = action.payload
        },
        setLendingState: (state, action) => {
            state.selectedBorrower = action.payload
        },
        setInitialOffer: (state, action) => {
            state.initialOffer = action.payload
        }
    },
});

export const { setSelectedBorrower, setLendingState, setInitialOffer } = authSlice.actions;

export default authSlice.reducer;
