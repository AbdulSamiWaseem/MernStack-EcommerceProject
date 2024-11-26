import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload._id)
            ] = action.payload;
        },
        updateUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // CREATE
        createUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createUserSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
        createUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailure,
    updateUsersStart,
    updateUsersSuccess,
    updateUsersFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
