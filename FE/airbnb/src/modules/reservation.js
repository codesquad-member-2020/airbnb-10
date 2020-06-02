const OPEN = "OPEN";
const CLOSE = "CLOSE";
const RESERVATION_FETCH = "RESERVATION_FETCH";

export const openReservation = () => {
  return {
    type: OPEN,
  };
};

export const closeReservation = () => {
  return {
    type: CLOSE,
  };
};

export const fetchReservation = (reservationData) => {
  return {
    type: RESERVATION_FETCH,
    reservationData,
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
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case OPEN:
      return { ...state, isClicked: true };
    case CLOSE:
      return { ...state, isClicked: false };
    case RESERVATION_FETCH:
      return { ...state, content: action.reservationData };
    default:
      return state;
  }
};

export default reservationReducer;
