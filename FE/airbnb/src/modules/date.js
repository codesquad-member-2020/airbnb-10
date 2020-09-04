// action type
const START_DATE = "date/START_DATE";
const END_DATE = "date/END_DATE";
const RESET = "date/RESET";

export const setStartDate = (dateState) => {
  return {
    type: START_DATE,
    dateState,
  };
};
export const setEndDate = (dateState) => {
  return {
    type: END_DATE,
    dateState,
  };
};

export const setResetDate = () => {
  return {
    type: RESET,
  };
};

const initialValue = {
  startDate: null,
  endDate: null,
};

const dateReducer = (state = initialValue, action) => {
  switch (action.type) {
    case START_DATE:
      return { ...state, startDate: action.dateState };
    case END_DATE:
      return { ...state, endDate: action.dateState };
    case RESET:
      return { startDate: null, endDate: null };
    default:
      return state;
  }
};

export default dateReducer;
