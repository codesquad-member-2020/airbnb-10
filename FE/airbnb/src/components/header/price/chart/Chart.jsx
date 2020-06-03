import React, { useEffect } from "react";
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
  chartBarWidthPercent: CHART_BAR_WIDTH,
  chartBarIncreaseUnit: CHART_POINT,
  chartWidth: CHART_WIDTH,
  chartHeight: CHART_HEIGHT,
  chartGauge: false,
  chartGaugeStart: null,
  chartGaugeEnd: null,
};

const Chart = ({
  chartBarUnit,
  chartBarCount,
  chartDatas,
  chartBarWidthPercent,
  chartBarIncreaseUnit,
  chartWidth,
  chartHeight,
  chartGauge,
  chartGaugeStart,
  chartGaugeEnd,
}) => {
  const calculationWidth = (widthPercent, count) => {
    return widthPercent / count;
  };

  const calculationChartDataLocate = (chartBarUnit, chartData) => {
    return Math.floor(chartData / chartBarUnit);
  };

  const calculationGaugeWidth = (type) => {
    const percentUnit = (chartBarUnit * chartBarCount) / 100;
    if (type === "start") {
      return chartGaugeStart / percentUnit;
    } else if (type === "end") {
      return 100 - chartGaugeEnd / percentUnit;
    }
  };

  const createChartBar = (chartBarCount) => {
    const widthValue = calculationWidth(chartBarWidthPercent, chartBarCount);

    const chartBars = Array.from({ length: 20 }, (v, i) => i).map((el) => {
      return (
        <ChartBar
          height={0}
          width={widthValue}
          count={0}
          dataScope={chartBarUnit * (el + 1)}
          chartBarIncreaseUnit={chartBarIncreaseUnit}
          key={el}
        />
      );
    });

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
      const height =
        chartBars[position].props.height >= 100
          ? chartBars[position].props.height
          : chartBars[position].props.height + chartBarIncreaseUnit;
      const width = chartBars[position].props.width;
      const count = chartBars[position].props.count + 1;
      const keyValue = chartBars[position].key;

      chartBars[position] = (
        <ChartBar
          height={height}
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

  const checkEssentialPropValue = () => {
    if (!chartBarUnit || !chartBarCount || !chartDatas) {
      throw Error(
        "ChartBarUnit, ChartBarCount, ChartDatas are essential props. Please check the props.",
      );
    } else if (chartBarIncreaseUnit && 100 % chartBarIncreaseUnit !== 0) {
      console.error(
        "The chartBarIncreaseUnit must be divided by 100 and the rest must be 0 to draw the exact graph.",
      );
    }
  };

  useEffect(() => {
    checkEssentialPropValue();
  }, []);

  return (
    <ChartWrap
      chartWidth={chartWidth !== CHART_WIDTH ? chartWidth : CHART_WIDTH}
      chartHeight={chartHeight !== CHART_HEIGHT ? chartHeight : CHART_HEIGHT}
    >
      {chartGauge && (
        <ChartRangeWrap>
          <GaugeStart width={calculationGaugeWidth("start")} />
          <GaugeEnd width={calculationGaugeWidth("end")} />
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
  chartHeight: PropTypes.number,
  chartGauge: PropTypes.bool,
  chartGaugeStart: PropTypes.number,
  chartGaugeEnd: PropTypes.number,
};
Chart.defaultProps = defaultProps;

const ChartWrap = styled.div`
  position: relative;
  width: ${(props) => `${props.chartWidth}%`};
  height: ${(props) => `${props.chartHeight}px`};
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

const GaugeStart = styled.div`
  background: rgba(255, 255, 255, 0.8);
  width: ${(props) => props.width && `${props.width}%`};
  z-index: 1;
`;

const GaugeEnd = styled.div`
  background: rgba(255, 255, 255, 0.8);
  width: ${(props) => props.width && `${props.width}%`};
  z-index: 1;
`;

export default Chart;
