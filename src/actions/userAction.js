export const Login = (email) => ({
    type: "LOGIN",
    payload: email,
});

export const SignOut = () => ({
    type: "LOGOUT",
});
