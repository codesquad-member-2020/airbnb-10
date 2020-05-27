import React, { useState } from "react";
import Rheostat from "rheostat";
import PriceModal from "./PriceModal.jsx";

import styled from "styled-components";
import { Button } from "../../../style/CustomStyle.jsx";

import "rheostat/css/rheostat.css";
import "react-dates/lib/css/_datepicker.css";
import ThemedStyleSheet from "react-with-styles/lib/ThemedStyleSheet";
import cssInterface from "react-with-styles-interface-css";
import RheostatDefaultTheme from "rheostat/lib/themes/DefaultTheme";
import ReactDatesDefaultTheme from "react-dates/lib/theme/DefaultTheme";
ThemedStyleSheet.registerInterface(cssInterface);
ThemedStyleSheet.registerTheme({
  ...RheostatDefaultTheme,
  ...ReactDatesDefaultTheme,
});

import { useDispatch, useSelector } from "react-redux";

const Price = () => {
  const [isClicked, setClicked] = useState(false);

  const { priceValues } = useSelector((state) => state.priceReducer);
  const [minPrice, maxPrice] = priceValues;

  const onClickPriceBtn = () => {
    setClicked(!isClicked);
  };

  return (
    <PriceWrap>
      <Button onClick={onClickPriceBtn}>금액</Button>
      {isClicked && <PriceModal priceValues={priceValues} />}
    </PriceWrap>
  );
};

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const PriceWrap = styled.div`
  position: relative;
`;

export default Price;
