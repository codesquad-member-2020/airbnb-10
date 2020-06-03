import { combineReducers } from "redux";
import personnelReducer from "./personnel.js";
import dateReducer from "./date.js";
import roomsListReducer from "./roomsList.js";
import priceReducer from "./price.js";
import reservationReducer from "./reservation.js";

const rootReducer = combineReducers({
  personnelReducer,
  dateReducer,
  roomsListReducer,
  priceReducer,
  reservationReducer,
});

export default rootReducer;
