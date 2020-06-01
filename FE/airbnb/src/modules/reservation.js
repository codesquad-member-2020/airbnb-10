const OPEN = "OPEN";

export const openReservation = () => {
  return {
    type: OPEN,
  };
};

const initialValue = {
  isClicked: false,
};

const reservationReducer = (state = initialValue, action) => {
  switch (action.type) {
    case OPEN:
      return { ...state, isClicked: true };
    //     case CLOSE:
    //       return { ...state, isClicked: false };
    default:
      return state;
  }
};

export default reservationReducer;
