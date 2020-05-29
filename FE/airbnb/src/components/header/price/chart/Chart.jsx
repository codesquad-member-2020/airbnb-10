import React from "react";
import styled from "styled-components";
import ChartBar from "./ChartBar.jsx";
import PropTypes from "prop-types";

import {
  CHART_POINT,
  CHART_BAR_WIDTH,
  CHART_WIDTH,
  CHART_HEIGHT,
} from "./ChartConstants.js";

const defaultProps = {
  chartBarUnit: null,
  chartBarCount: null,
  chartDatas: null,
  chartBarIncreasePoint: CHART_POINT,
  chartBarWidthPercent: CHART_BAR_WIDTH,
};

const Chart = ({
  chartBarUnit,
  chartBarCount,
  chartDatas,
  chartBarWidthPercent,
  chartBarIncreasePoint,
}) => {
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
          dataScope={chartBarUnit * multiplicationCount}
          height={0}
          width={widthValue}
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
      const position = calculationChartDataLocate(chartBarUnit, el);
      const dataScope = chartBars[position].props.dataScope;
      const height = chartBars[position].props.height;
      const width = chartBars[position].props.width;

      return (chartBars[position] = (
        <ChartBar
          dataScope={dataScope}
          height={height + chartBarIncreasePoint}
          width={width}
        />
      ));
    });

    return chartBars;
  };

  return <ChartWrap>{analyseChartData(chartDatas)}</ChartWrap>;
};

Chart.propTypes = {
  chartBarUnit: PropTypes.number,
  chartBarCount: PropTypes.number,
  chartDatas: PropTypes.arrayOf(PropTypes.number),
  chartBarWidthPercent: PropTypes.number,
  chartBarIncreasePoint: PropTypes.number,
};
Chart.defaultProps = defaultProps;

const ChartWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  border-bottom: 3px solid var(--gray-1);
  opacity: 0.7;
`;

export default Chart;
