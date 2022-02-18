let userState;

if (window.localStorage.getItem("auth")) {
    userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
    userState = null;
}
// console.log(userState);

export const authReducer = (state = userState, action) => {
    // console.log("State", state);
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};
