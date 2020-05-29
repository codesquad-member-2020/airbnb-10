import React, { useState } from "react";
import PriceModal from "./PriceModal.jsx";

import styled from "styled-components";
import { Button } from "../../../style/CustomStyle.jsx";

import { useDispatch, useSelector } from "react-redux";
import { resetPrices } from "../../../modules/price.js";

const Price = () => {
  const [isClicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const { priceValues } = useSelector((state) => state.priceReducer);
  const [minPrice, maxPrice] = priceValues;

  const onClickPriceBtn = () => {
    setClicked(!isClicked);
  };

  const resetBtnHandler = () => {
    dispatch(resetPrices());
  };

  return (
    <PriceWrap>
      <Button onClick={onClickPriceBtn}>금액</Button>
      {isClicked && (
        <PriceModal
          priceValues={priceValues}
          minPrice={minPrice}
          maxPrice={maxPrice}
          resetHandler={resetBtnHandler}
        />
      )}
    </PriceWrap>
  );
};

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const PriceWrap = styled.div`
  position: relative;
`;

export default Price;
