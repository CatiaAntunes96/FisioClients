import {createStore} from "redux";
import AllReducers from "./AuthReducer";

const initialState = {
    auth: {
        loggedIn: false,
        user: {}
    }
};

const store = createStore(
    AllReducers,
    initialState
);

export default store;
