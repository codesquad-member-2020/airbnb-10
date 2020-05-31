import React from "react";
import PriceRange from "./PriceRange.jsx";
import PriceBoxes from "./PriceBoxes.jsx";
import ModalButtons from "../ModalButtons.jsx";
import Chart from "./chart/Chart.jsx";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

import { resetPrices } from "../../../modules/price.js";
import { useDispatch, useSelector } from "react-redux";

const PriceModal = () => {
  const dispatch = useDispatch();
  const { priceValues } = useSelector((state) => state.priceReducer);
  const [minPrice, maxPrice] = priceValues;

  const onClickResetHandler = () => {
    dispatch(resetPrices());
  };

  return (
    <PriceModalWrap>
      <Chart
        chartBarUnit={PRICE_UNIT}
        chartBarCount={CHART_COUNT}
        chartDatas={CHART_DATAS}
        chartBarIncreaseUnit={2}
        chartBarWidthPercent={90}
        chartWidth={100}
        chartGauge
        chartGaugeStart={minPrice}
        chartGaugeEnd={maxPrice}
      />
      <PriceRange />
      <PriceBoxes />
      <ModalButtons resetHandler={onClickResetHandler} />
    </PriceModalWrap>
  );
};

const PRICE_UNIT = 50000;
const CHART_COUNT = 20;
const CHART_DATAS = [
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  50000,
  100000,
  150000,
  200000,
  250000,
  300000,
  350000,
  400000,
];

const PriceModalWrap = styled(ToggleWrap)`
  position: absolute;
  margin-top: 5px;
  padding: 20px;
  width: 30vw;
`;

export default PriceModal;
