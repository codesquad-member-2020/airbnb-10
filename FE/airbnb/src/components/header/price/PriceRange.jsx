import React from "react";
import { useDispatch } from "react-redux";
import { setPrices } from "../../../modules/price.js";

import Rheostat from "rheostat";

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

import styled from "styled-components";

const PriceRange = ({ priceValues }) => {
  const dispatch = useDispatch();

  const onValuesUpdatedHandler = ({ values }) => {
    dispatch(setPrices(values));
  };

  return (
    <PriceRangeWrap>
      <Rheostat
        min={MIN_PRICE}
        max={MAX_PRICE}
        values={priceValues}
        onValuesUpdated={onValuesUpdatedHandler}
      />
    </PriceRangeWrap>
  );
};

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const PriceRangeWrap = styled.div`
  margin-top: 10px;
  .DefaultHandle_handle {
    border-radius: 50%;
  }
  .DefaultProgressBar_progressBar {
    background-color: #fc3962;
    opacity: 0.9;
  }
  .DefaultBackground_background__horizontal {
    height: 10px;
    border-radius: 10px;
  }
  .DefaultProgressBar_background__horizontal {
    height: 8px;
    border-radius: 10px;
  }
`;

export default PriceRange;
