import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    email: '',
    id: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            if(action.payload.type === "ID"){
                state.id = action.payload.payload;
            }
            else if(action.payload.type === "EMAIL"){
                state.email = action.payload.payload;
            }
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = '';
            state.id = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
