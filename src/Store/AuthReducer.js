import { combineReducers } from "redux";
import AuthReducer from "./Reducer";

const AllReducers = combineReducers({ 
    auth: AuthReducer
});

export default AllReducers;