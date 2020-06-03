// action type

const INCREASE = "person/INCREASE";
const DECREASE = "person/DECREASE";
const SET_COUNT = "person/SET_COUNT";
const RESET = "person/RESET";

export const setPersonnelCount = (personnelType, personnelCount) => {
  return {
    type: SET_COUNT,
    personnelType,
    personnelCount,
  };
};

export const increaseCount = (personnelType) => {
  return {
    type: INCREASE,
    personnelType,
  };
};

export const decreaseCount = (personnelType) => {
  return {
    type: DECREASE,
    personnelType,
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
    case INCREASE:
      return setIncreaseCount(action.personnelType, state);

    case DECREASE:
      return setDecreaseCount(action.personnelType, state);

    case SET_COUNT:
      return judgePersonnelCount(
        state,
        action.personnelType,
        action.personnelCount,
      );

    case RESET:
      return { adultCount: 0, childCount: 0, babyCount: 0, totalCount: 0 };

    default:
      return state;
  }
};

const judgePersonnelCount = (state, personnelType, personnelCount) => {
  const returnObj = { ...state };
  if (personnelType !== "babyCount") {
    returnObj["totalCount"] = state.totalCount + personnelCount;
    returnObj[personnelType] = personnelCount;
    return returnObj;
  } else {
    returnObj[personnelType] = personnelCount;
    return returnObj;
  }
};

const setIncreaseCount = (personnelType, state) => {
  const returnObj = {
    ...state,
    totalCount:
      personnelType !== "babyCount" ? state.totalCount + 1 : state.totalCount,
  };
  returnObj[personnelType] = state[personnelType] + 1;
  return returnObj;
};

const setDecreaseCount = (personnelType, state) => {
  const returnObj = {
    ...state,
    totalCount:
      personnelType !== "babyCount" ? state.totalCount - 1 : state.totalCount,
  };
  returnObj[personnelType] = state[personnelType] - 1;
  return returnObj;
};

export default personnelReducer;
