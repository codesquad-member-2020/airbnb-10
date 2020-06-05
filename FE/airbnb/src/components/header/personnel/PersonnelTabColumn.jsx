import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { CountButton } from "../../../style/CustomStyle.jsx";

const PersonnelTabColumn = ({
  count,
  onIncrease,
  onDecrease,
  personnelType,
  personnelScope,
  storeKey,
}) => {
  const dispatch = useDispatch();

  const onIncreaseCount = (actionFunc) => {
    if (count === MAX_COUNT) {
      return;
    }
    dispatch(actionFunc(storeKey));
  };

  const onDecreaseCount = (actionFunc) => {
    if (count <= MIN_COUNT) {
      return;
    }
    dispatch(actionFunc(storeKey));
  };

  return (
    <Column>
      <PersonnelInfoArea>
        <div>{personnelType}</div>
        <div>{personnelScope}</div>
      </PersonnelInfoArea>
      <CountArea>
        <CountButton
          onClick={() => {
            onDecreaseCount(onDecrease);
          }}
        >
          -
        </CountButton>
        <div>{count}</div>
        <CountButton
          onClick={() => {
            onIncreaseCount(onIncrease);
          }}
        >
          +
        </CountButton>
      </CountArea>
    </Column>
  );
};

const MIN_COUNT = 0;
const MAX_COUNT = 8;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  width: 85%;
  height: 15%;
  padding: 20px;
  border-radius: 5%;
`;

const CountArea = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PersonnelInfoArea = styled.div`
  line-height: 1.5rem;
`;

export default PersonnelTabColumn;
