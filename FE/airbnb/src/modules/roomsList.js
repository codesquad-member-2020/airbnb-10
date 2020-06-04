const INITIAL_FETCH = "roomsList/INITIAL_FETCH";
const ACCOMMODATIONS_FETCH = "roomsList/PAGINATION_FETCH";

export const fetchInitialData = (initialData) => {
  return {
    type: INITIAL_FETCH,
    initialData: initialData.content,
  };
};

export const fetchAccommodationsData = (data) => {
  return {
    type: ACCOMMODATIONS_FETCH,
    accommodations: data.content.accommodations,
  };
};

const initialValue = {
  content: {
    total: null,
    accommodations: [
      {
        id: null,
        name: null,
        price: null,
        totalPrice: null,
        isSuperHost: null,
        city: null,
        scoresRating: null,
        images: [
          {
            url: null,
          },
        ],
      },
    ],
    fee: {
      average: null,
      feelist: [],
      maximum: null,
      minMum: null,
    },
  },
};

const roomsListReducer = (state = initialValue, action) => {
  switch (action.type) {
    case INITIAL_FETCH:
      return { ...state, content: action.initialData };
    case ACCOMMODATIONS_FETCH:
      return {
        ...state,
        content: { ...state.content, accommodations: action.accommodations },
      };

    default:
      return state;
  }
};

export default roomsListReducer;
