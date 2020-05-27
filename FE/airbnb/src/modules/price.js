const UPDATE_PRICES = "price/UPDATE_PRICES";
const RESET_PRICES = "price/RESET_PRICES";

const INITIAL_MIN_PRICE = 0;
const INITIAL_MAX_PRICE = 500000;

export const setPrices = (values) => {
  return {
    type: UPDATE_PRICES,
    values,
  };
};

export const resetPrices = () => {
  return {
    type: RESET_PRICES,
  };
};

const initialValue = {
  priceValues: [INITIAL_MIN_PRICE, INITIAL_MAX_PRICE],
};

const priceReducer = (state = initialValue, action) => {
  switch (action.type) {
    case UPDATE_PRICES:
      return { priceValues: action.values };
    case RESET_PRICES:
      return { priceValues: [INITIAL_MIN_PRICE, INITIAL_MAX_PRICE] };
    default:
      return state;
  }
};
export default priceReducer;
