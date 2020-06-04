const UPDATE_CURRENT_PAGE = "pagination/UPDATE_CURRENT_PAGE";
const UPDATE_START_END_PAGE = "pagination/UPDATE_START_END_PAGE";
const ACTIVE_PAGINATION = "pagination/ACTIVATED_PAGINATION";

export const updateCurrentPage = (currentPage) => {
  return {
    type: UPDATE_CURRENT_PAGE,
    currentPage,
  };
};

export const updateStartEndPage = (startPage, endPage) => {
  return {
    type: UPDATE_START_END_PAGE,
    startPage,
    endPage,
  };
};

export const updateActive = (activeBoolType) => {
  return {
    type: ACTIVE_PAGINATION,
    activeBoolType,
  };
};

const initialValue = {
  paginationActive: false,
  currentPage: 1,
  startPage: 0,
  endPage: 10,
};

const paginationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case UPDATE_START_END_PAGE:
      return {
        ...state,
        startPage: action.startPage,
        endPage: action.endPage,
      };
    case ACTIVE_PAGINATION:
      return { ...state, paginationActive: action.activeBoolType };
    default:
      return state;
  }
};

export default paginationReducer;
