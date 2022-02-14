import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    token: null,
    isSignedIn: false,
    user: null,
    hereFor: null,
    whoAmI: null,
    walletDetails: {},
    upi: null,
    userState: ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isSignedIn = true;
            state.id = action.payload.id;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            state.walletDetails = {
                userName: "PK3950",
                walletId: "xyz_1234",
                summary: [
                    { name: "Group A", value: 400 },
                    { name: "Group B", value: 300 },
                    { name: "Group C", value: 300 },
                ],
            };
        },
        logOut: (state) => {
            state.isSignedIn = false;
        },
        updateUserState: (state, action) => {
            state.userState = action.payload
        },
        setHereFor: (state, action) => {
            state.hereFor = action.payload;
        },
        setUpi: (state, action) => {
            state.upi = action.payload;
        },
        setwhoAmI: (state, action) => {
            state.whoAmI = action.payload;
        },
    },
});

export const { signIn, logOut, updateUserState, setUpi, setHereFor, setwhoAmI } = authSlice.actions;

export default authSlice.reducer;
