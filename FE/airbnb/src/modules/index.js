import { combineReducers } from "redux";
import personnelReducer from "./personnel.js";
import dateReducer from "./date.js";
import roomsListReducer from "./roomsList.js";

const rootReducer = combineReducers({
  personnelReducer,
  dateReducer,
  roomsListReducer,
});

export default rootReducer;
