import React from "react";
import styled from "styled-components";
import ChartBar from "./ChartBar.jsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { CHART_POINT, CHART_BAR_WIDTH, CHART_WIDTH } from "./ChartConstants.js";

const defaultProps = {
  chartBarUnit: null,
  chartBarCount: null,
  chartDatas: null,
  chartBarWidthPercent: CHART_BAR_WIDTH,
  chartBarIncreaseUnit: CHART_POINT,
  chartWidth: CHART_WIDTH,
  chartGauge: false,
};

const Chart = ({
  chartBarUnit,
  chartBarCount,
  chartDatas,
  chartBarWidthPercent,
  chartBarIncreaseUnit,
  chartWidth,
  chartGauge,
}) => {
  const { priceValues } = useSelector((state) => state.priceReducer);
  const [minPrice, maxPrice] = priceValues;

  const calculationWidth = (widthPercent, count) => {
    return widthPercent / count;
  };

  const calculationChartDataLocate = (chartBarUnit, chartData) => {
    return Math.floor(chartData / chartBarUnit);
  };

  const createChartBar = (chartBarCount) => {
    const widthValue = calculationWidth(chartBarWidthPercent, chartBarCount);

    const chartBars = [];

    let multiplicationCount = 1;

    for (let i = 0; i < chartBarCount; i++) {
      const chartBar = (
        <ChartBar
          height={0}
          width={widthValue}
          count={0}
          dataScope={chartBarUnit * multiplicationCount}
          chartBarIncreaseUnit={chartBarIncreaseUnit}
          key={i}
        />
      );

      chartBars.push(chartBar);

      multiplicationCount++;
    }

    return chartBars;
  };

  const analyseChartData = (chartDatas) => {
    const chartBars = createChartBar(chartBarCount);

    chartDatas.forEach((el) => {
      let position = calculationChartDataLocate(chartBarUnit, el);

      if (position >= chartBarCount) {
        const chartLastIndex = chartBarCount - 1;
        position = chartLastIndex;
      }

      const dataScope = chartBars[position].props.dataScope;
      const height = chartBars[position].props.height;
      const width = chartBars[position].props.width;
      const count = chartBars[position].props.count + 1;
      const keyValue = chartBars[position].key;

      chartBars[position] = (
        <ChartBar
          height={height + chartBarIncreaseUnit}
          width={width}
          count={count}
          dataScope={dataScope}
          chartBarIncreaseUnit={chartBarIncreaseUnit}
          key={keyValue}
        />
      );
    });

    return chartBars;
  };

  return (
    <ChartWrap
      chartWidth={chartWidth !== CHART_WIDTH ? chartWidth : CHART_WIDTH}
    >
      {chartGauge && (
        <ChartRangeWrap>
          <ChartStartPoint width={minPrice / 10000} />
          <ChartEndPoint width={100 - maxPrice / 10000} />
        </ChartRangeWrap>
      )}
      {analyseChartData(chartDatas)}
    </ChartWrap>
  );
};

Chart.propTypes = {
  chartBarUnit: PropTypes.number,
  chartBarCount: PropTypes.number,
  chartDatas: PropTypes.arrayOf(PropTypes.number),
  chartBarWidthPercent: PropTypes.number,
  chartBarIncreaseUnit: PropTypes.number,
  chartWidth: PropTypes.number,
  chartGauge: PropTypes.bool,
};
Chart.defaultProps = defaultProps;

const ChartWrap = styled.div`
  position: relative;
  width: ${(props) =>
    props.chartWidth ? `${props.chartWidth}%` : `${CHART_WIDTH}%`};
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  border-bottom: 3px solid var(--gray-1);
  opacity: 0.7;
`;

const ChartRangeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
`;

const ChartStartPoint = styled.div`
  background: rgba(255, 255, 255, 0.8);
  width: ${(props) => props.width && `${props.width}%`};
  z-index: 1;
`;

const ChartEndPoint = styled.div`
  background: rgba(255, 255, 255, 0.8);
  width: ${(props) => props.width && `${props.width}%`};
  z-index: 1;
`;

export default Chart;
