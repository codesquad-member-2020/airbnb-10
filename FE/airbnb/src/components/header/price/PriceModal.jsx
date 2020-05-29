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
        snapPointUnit={PRICE_UNIT}
        snapPoints={SNAP_POINT}
        chartDatas={CHART_DATAS}
      />
      <PriceRange priceValues={priceValues}></PriceRange>
      <PriceBoxes minPrice={minPrice} maxPrice={maxPrice} />
      <ModalButtons resetHandler={resetHandler} />
    </PriceModalWrap>
  );
};

const PRICE_UNIT = 50000;
const SNAP_POINT = [
  50000,
  100000,
  200000,
  250000,
  300000,
  350000,
  400000,
  450000,
  500000,
  550000,
  600000,
  650000,
  700000,
  750000,
  800000,
  850000,
  900000,
  950000,
  1000000,
];
const CHART_DATAS = [
  450000,
  600000,
  302004,
  566000,
  100000,
  560000,
  400050,
  300000,
];

const PriceModalWrap = styled(ToggleWrap)`
  margin-top: 5px;
  padding: 20px;
  width: 30vw;
`;

export default PriceModal;
