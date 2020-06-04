const UPDATE_CURRENT_PAGE = "pagination/UPDATE_CURRENT_PAGE";
const UPDATE_START_END_PAGE = "pagination/UPDATE_START_END_PAGE";

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

const initialValue = {
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

    default:
      return state;
  }
};

export default paginationReducer;
