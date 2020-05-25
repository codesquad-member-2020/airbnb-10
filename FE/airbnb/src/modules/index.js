import { combineReducers } from "redux";
import personnelReducer from "./personnel.js";

const rootReducer = combineReducers({
  personnelReducer,
});

export default rootReducer;
