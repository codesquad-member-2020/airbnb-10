import React from "react";
import PriceRange from "./PriceRange.jsx";
import PriceBoxes from "./PriceBoxes.jsx";
import ModalButtons from "../ModalButtons.jsx";
import Chart from "./chart/Chart.jsx";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

import { resetPrices } from "../../../modules/price.js";
import { useDispatch, useSelector } from "react-redux";

const PriceModal = ({ modalHandler }) => {
  const dispatch = useDispatch();
  const {
    priceReducer: { priceValues },
    roomsListReducer: { content },
  } = useSelector((state) => state);
  const [minPrice, maxPrice] = priceValues;

  const {
    fee: { average },
  } = content;

  const onClickResetHandler = () => {
    dispatch(resetPrices());
  };

  return (
    <PriceModalWrap>
      <AverageContent>평균 1박 요금은 ₩{average}원 입니다.</AverageContent>
      <Chart
        chartBarUnit={PRICE_UNIT}
        chartBarCount={CHART_COUNT}
        chartDatas={content.fee.feelist}
        chartBarIncreaseUnit={2}
        chartBarWidthPercent={90}
        chartWidth={100}
        chartHeight={150}
        chartGauge
        chartGaugeStart={minPrice}
        chartGaugeEnd={maxPrice}
      />
      <PriceRange />
      <PriceBoxes />
      <ModalButtons
        setModal={modalHandler}
        resetHandler={onClickResetHandler}
      />
    </PriceModalWrap>
  );
};

const PRICE_UNIT = 50000;
const CHART_COUNT = 20;

const PriceModalWrap = styled(ToggleWrap)`
  position: absolute;
  margin-top: 5px;
  padding: 20px;
  width: 30vw;
`;

const AverageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default PriceModal;
