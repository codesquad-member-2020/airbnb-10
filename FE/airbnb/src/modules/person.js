// action type
const ADULT_INCREASE = "person/ADULT_INCREASE";
const ADULT_DECREASE = "person/ADULT_DECREASE";

const CHILD_INCREASE = "person/CHILD_INCREASE";
const CHILD_DECREASE = "person/CHILD_DECREASE";

const BABY_INCREASE = "person/BABY_INCREASE";
const BABY_DECREASE = "person/BABY_DECREASE";

const RESET = "person/RESET";

const increaseAdultCount = () => {
  return {
    type: ADULT_INCREASE,
  };
};
const decreaseAdultCount = () => {
  return {
    type: ADULT_DECREASE,
  };
};
const increaseChildCount = () => {
  return {
    type: CHILD_INCREASE,
  };
};
const decreaseChildCount = () => {
  return {
    type: CHILD_DECREASE,
  };
};
const increaseBabyCount = () => {
  return {
    type: BABY_INCREASE,
  };
};
const decreaseBabyCount = () => {
  return {
    type: BABY_DECREASE,
  };
};

const resetCount = () => {
  return {
    type: RESET,
  };
};

const initialValue = {
  adultCount: 0,
  childCount: 0,
  babyCount: 0,
  totalCount: 0,
};

const personReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ADULT_INCREASE:
      return { ...state, adultCount: state.adultCount + 1, totalCount: state.totalCount + 1 };

    case ADULT_DECREASE:
      return { ...state, adultCount: state.adultCount - 1, totalCount: state.totalCount + 1 };

    case CHILD_INCREASE:
      return { ...state, childCount: state.adultCount + 1, totalCount: state.totalCount + 1 };

    case CHILD_DECREASE:
      return { ...state, childCount: state.adultCount - 1, totalCount: state.totalCount + 1 };

    case BABY_INCREASE:
      return { ...state, adultCount: state.adultCount + 1, totalCount: state.totalCount + 1 };

    case BABY_DECREASE:
      return { ...state, adultCount: state.adultCount - 1, totalCount: state.totalCount + 1 };
    case RESET:
      return { adultCount: 0, childCount: 0, babyCount: 0, totalCount: 0 };
    default:
      return state;
  }
};

export default personReducer;
