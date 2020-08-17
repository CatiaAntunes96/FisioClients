import {createStore} from "redux";
import AllReducers from "./AllReducers";

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
