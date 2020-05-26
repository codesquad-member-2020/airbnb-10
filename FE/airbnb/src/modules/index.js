import { combineReducers } from "redux";
import personnelReducer from "./personnel.js";
import dateReducer from "./date.js";
const rootReducer = combineReducers({
  personnelReducer,
  dateReducer,
});

export default rootReducer;
