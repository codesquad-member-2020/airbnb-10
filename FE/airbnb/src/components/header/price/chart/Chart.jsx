import React from "react";
import styled from "styled-components";
import ChartBar from "./ChartBar.jsx";

const Chart = ({ snapPointUnit, snapPoints, chartDatas }) => {
  const calculationWidth = (length) => {
    return 40 / length;
  };

  const calculationChartDataLocate = (snapPointUnit, data) => {
    return Math.floor(data / snapPointUnit);
  };

  console.log(<ChartBar height={20} />);

  const createChartBar = (snapPoints) => {
    const widthValue = calculationWidth(snapPoints.length);
    const chartBars = snapPoints.map((el) => {
      return <ChartBar dataScope={el} height={2} width={widthValue} />;
    });
    return chartBars;
  };

  const setChartBarHeight = (chartDatas) => {
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

  opacity: 0.7;
`;

export default Chart;
