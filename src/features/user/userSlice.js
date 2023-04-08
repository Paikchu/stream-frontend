import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.email = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
