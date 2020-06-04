// export const updateCurrentPage = (currentPage) => {

// }

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
        current: action.current,
      };
    case UPDATE_START_END_PAGE:
      return {
        ...state,
        startPage: action.startPage,
        endPage: action.endPage,
      };
    default:
      return;
  }
};
