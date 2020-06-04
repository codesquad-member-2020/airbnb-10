const RESERVATION_FETCH = "reservation/RESERVATION_FETCH";

export const fetchReservation = (reservationData, scoresRating) => {
  return {
    type: RESERVATION_FETCH,
    reservationData: reservationData.content,
    scoresRating,
  };
};

const initialValue = {
  isClicked: false,
  content: {
    id: null,
    pricePerNightDiscounted: null,
    priceDuringPeriod: null,
    cleaningFee: null,
    serviceTax: null,
    accommodationTax: null,
    totalPrice: null,
  },
  scoresRating: null,
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case RESERVATION_FETCH:
      return {
        ...state,
        content: action.reservationData,
        scoresRating: action.scoresRating,
      };
    default:
      return state;
  }
};

export default reservationReducer;
