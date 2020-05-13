import {createStore} from "redux";
import AuthReducer from "./Reducer";

const initialState = {
    auth: {
        loggedIn: false,
        user: {}
    }
};

const store = createStore(
    AuthReducer,
    initialState
);

export default store;
