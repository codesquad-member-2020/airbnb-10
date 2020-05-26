const INITIAL_FETCH = "roomsList/INITIAL_FETCH";

export const fetchInitialData = (initialData) => {
  return {
    type: INITIAL_FETCH,
    initialData: initialData.content,
  };
};

const initialValue = {
  content: [
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
};

const roomsListReducer = (state = initialValue, action) => {
  switch (action.type) {
    case INITIAL_FETCH:
      return { ...state, content: action.initialData };
    default:
      return state;
  }
};

export default roomsListReducer;
