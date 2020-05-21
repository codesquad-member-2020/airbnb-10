import { combineReducers } from "redux";
import personReducer from "./person.js";

const rootReducer = combineReducers({ personReducer });

export default rootReducer;
