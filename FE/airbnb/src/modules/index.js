import { combineReducers } from "redux";
import personnelReducer from "./personnel.js";
import dateReducer from "./date.js";
import roomsListReducer from "./roomsList.js";
import priceReducer from "./price.js";

const rootReducer = combineReducers({
  personnelReducer,
  dateReducer,
  roomsListReducer,
  priceReducer,
});

export default rootReducer;
