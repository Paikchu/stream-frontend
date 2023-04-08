import { login, logout } from './userSlice';

export const signIn = (email, password) => async (dispatch) => {
    // Code for sign in with email and password

    // If successful sign in
    dispatch(login(email));
};

export const signOut = () => async (dispatch) => {
    // Code for sign out

    // If successful sign out
    dispatch(logout());
};
