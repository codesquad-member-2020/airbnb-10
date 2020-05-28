import React from "react";
import styled from "styled-components";
import ChartBar from "./ChartBar.jsx";

const Chart = ({
  snapPointUnit,
  snapPoints,
  chartDatas,
  chartBarWidthPercent,
}) => {
  const calculationWidth = (length) => {
    return chartBarWidthPercent / length;
  };

  const calculationChartDataLocate = (snapPointUnit, chartData) => {
    return Math.floor(chartData / snapPointUnit);
  };

  const createChartBar = (snapPoints) => {
    const widthValue = calculationWidth(snapPoints.length);
    const chartBars = snapPoints.map((el) => {
      return <ChartBar dataScope={el} height={0} width={widthValue} />;
    });
    return chartBars;
  };

  const analyseChartData = (chartDatas) => {
    const chartBars = createChartBar(snapPoints);

    chartDatas.forEach((el) => {
      const position = calculationChartDataLocate(snapPointUnit, el);
      const dataScope = chartBars[position].props.dataScope;
      const height = chartBars[position].props.height;
      const width = chartBars[position].props.width;

      return (chartBars[position] = (
        <ChartBar
          dataScope={dataScope}
          height={height + CHART_POINT}
          width={width}
        />
      ));
    });

    return chartBars;
  };

  return <ChartWrap>{setChartBarHeight(chartDatas)}</ChartWrap>;
};

const CHART_POINT = 10;

const ChartWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  border-bottom: 3px solid var(--gray-1);
  opacity: 0.7;
`;

export default Chart;
