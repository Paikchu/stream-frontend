const initialState = {
    isLoggedIn: false,
    email: "",
};

const userReducer = (state = initialState, action) => {
    console.log("userReducer working...");
    console.log(action.type);
    switch (action.type) {
        case "LOGIN":
            return {
                isLoggedIn: true,
                email: action.payload,
            };
        case "LOGOUT":
            return {
                isLoggedIn: false,
                email: "",
            };
        default:
            return state;
    }
};

export default userReducer;
