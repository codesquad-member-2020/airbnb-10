const UPDATE_PRICES = "price/UPDATE_PRICES";
const setPrice = (values) => {
  return {
    type: UPDATE_PRICES,
    values,
  };
};
const initialValue = {
  priceValues: [0, 500000],
};
const priceReducer = (state = initialValue, action) => {
  switch (action.type) {
    case UPDATE_PRICES:
      return { priceValues: action.values };
    default:
      return state;
  }
};
export default priceReducer;
