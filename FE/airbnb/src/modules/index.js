import { combineReducers } from "redux";
import personReducer from "./person.jsx";

const rootReducer = combineReducers({ personReducer });

export default rootReducer;
