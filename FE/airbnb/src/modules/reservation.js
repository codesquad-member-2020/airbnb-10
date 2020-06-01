const OPEN = "OPEN";
const CLOSE = "CLOSE";

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

const initialValue = {
  isClicked: false,
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case OPEN:
      return { ...state, isClicked: true };
    case CLOSE:
      return { ...state, isClicked: false };
    default:
      return state;
  }
};

export default reservationReducer;
