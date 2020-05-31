import React, { useState } from "react";
import styled from "styled-components";

const ChartBar = ({ height, dataScope, width, chartBarIncreaseUnit }) => {
  const [isOver, setIsOver] = useState(false);

  const onMouseOverHandler = () => {
    setIsOver(!isOver);
  };

  const calculationRoomsCount = () => {
    if (height === DEFAULT_HEIGHT) {
      return 0;
    } else {
      return Math.floor(height / chartBarIncreaseUnit);
    }
  };

  return (
    <ChartBarWrap
      height={height}
      dataScope={dataScope}
      width={width}
      onMouseEnter={onMouseOverHandler}
      onMouseLeave={onMouseOverHandler}
    >
      {isOver && (
        <ChartBarInfoModal position={height}>
          <div>unit : {dataScope}</div>
          <div>count : {calculationRoomsCount()}</div>
        </ChartBarInfoModal>
      )}
    </ChartBarWrap>
  );
};

const DEFAULT_HEIGHT = 2;

const ChartBarWrap = styled.div`
  width: ${(props) => props.width && `${props.width}%`};
  height: ${(props) => props.height && `${props.height}px`};

  background-color: gray;
  position: relative;
  border-bottom: none;
`;

const ChartBarInfoModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 7vw;
  position: absolute;
  padding: 3px;
  background-color: red;
  border-radius: 10px;
  bottom: ${(props) => props.position && `${props.position}px`};
  z-index: 1;
  font-size: 12px;
  margin-bottom: 2px;
  color: var(--white);
`;

export default ChartBar;
