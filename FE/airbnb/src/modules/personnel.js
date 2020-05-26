// action type
const ADULT_INCREASE = "person/ADULT_INCREASE";
const ADULT_DECREASE = "person/ADULT_DECREASE";

const CHILD_INCREASE = "person/CHILD_INCREASE";
const CHILD_DECREASE = "person/CHILD_DECREASE";

const BABY_INCREASE = "person/BABY_INCREASE";
const BABY_DECREASE = "person/BABY_DECREASE";

const RESET = "person/RESET";

export const increaseAdultCount = () => {
  return {
    type: ADULT_INCREASE,
  };
};
export const decreaseAdultCount = () => {
  return {
    type: ADULT_DECREASE,
  };
};
export const increaseChildCount = () => {
  return {
    type: CHILD_INCREASE,
  };
};
export const decreaseChildCount = () => {
  return {
    type: CHILD_DECREASE,
  };
};
export const increaseBabyCount = () => {
  return {
    type: BABY_INCREASE,
  };
};
export const decreaseBabyCount = () => {
  return {
    type: BABY_DECREASE,
  };
};

export const resetCount = () => {
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

const personnelReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ADULT_INCREASE:
      return setIncreaseCount("adultCount", state);

    case ADULT_DECREASE:
      return setDecreaseCount("adultCount", state);

    case CHILD_INCREASE:
      return setIncreaseCount("childCount", state);

    case CHILD_DECREASE:
      return setDecreaseCount("childCount", state);

    case BABY_INCREASE:
      return setIncreaseCount("babyCount", state);

    case BABY_DECREASE:
      return setDecreaseCount("babyCount", state);

    case RESET:
      return { adultCount: 0, childCount: 0, babyCount: 0, totalCount: 0 };

    default:
      return state;
  }
};

const setIncreaseCount = (personnelType, state) => {
  const returnObj = { ...state, totalCount: state.totalCount + 1 };
  returnObj[personnelType] = state[personnelType] + 1;
  return returnObj;
};

const setDecreaseCount = (personnelType, state) => {
  const returnObj = { ...state, totalCount: state.totalCount - 1 };
  returnObj[personnelType] = state[personnelType] - 1;
  return returnObj;
};

// const TEST_INCREASE = "person/TEST_INCREASE";
// const TEST_DECREASE = "person/TEST_DECREASE";

// const TEST_RESET = "person/TEST_RESET";

// const test_initialValue = {
//   adultCount: 0,
//   childCount: 0,
//   babyCount: 0,
//   totalCount: 0,
// };

// export const test_increaseCount = (personnelType) => {
//   return {
//     type: TEST_INCREASE,
//     personnelType,
//   };
// };
// export const test_decreaseCount = (personnelType) => {
//   return {
//     type: TEST_DECREASE,
//     personnelType,
//   };
// };

// const test_setIncreaseCount = (personnelType, state) => {
//   const returnObj = { ...state, totalCount: state.totalCount + 1 };
//   returnObj[personnelType] = state[personnelType] + 1;
//   return returnObj;
// };

// const test_setDecreaseCount = (personnelType, state) => {
//   const returnObj = { ...state, totalCount: state.totalCount + 1 };
//   returnObj[personnelType] = state[personnelType] + 1;
//   return returnObj;
// };

// export const test_personnelReducer = (state = test_initialValue, action) => {
//   switch (action.type) {
//     case TEST_INCREASE:
//       return test_setIncreaseCount(action.personnelType, state);
//     case TEST_DECREASE:
//       return test_setDecreaseCount(action.personnelType, state);
//     default:
//       return state;
//   }
// };

export default personnelReducer;
