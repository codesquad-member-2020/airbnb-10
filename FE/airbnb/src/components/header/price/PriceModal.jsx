import React from "react";
import PriceRange from "./PriceRange.jsx";
import PriceBoxes from "./PriceBoxes.jsx";
import ModalButtons from "../ModalButtons.jsx";
import Chart from "./chart/Chart.jsx";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

const PriceModal = ({ priceValues, minPrice, maxPrice, resetHandler }) => {
  return (
    <PriceModalWrap>
      <Chart
        chartBarUnit={PRICE_UNIT}
        chartBarCount={CHART_COUNT}
        chartDatas={CHART_DATAS}
        chartBarWidthPercent={90}
        chartBarIncreaseUnit={10}
        chartWidth={50}
      />
      <PriceRange priceValues={priceValues}></PriceRange>
      <PriceBoxes minPrice={minPrice} maxPrice={maxPrice} />
      <ModalButtons resetHandler={resetHandler} />
    </PriceModalWrap>
  );
};

const PRICE_UNIT = 50000;
const CHART_COUNT = 20;
const CHART_DATAS = [500000, 500000, 500000, 500000, 500000];

const PriceModalWrap = styled(ToggleWrap)`
  position: absolute;
  margin-top: 5px;
  padding: 20px;
  width: 30vw;
`;

export default PriceModal;
