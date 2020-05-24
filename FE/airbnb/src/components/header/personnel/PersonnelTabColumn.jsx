import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { CountButton } from "../../../style/CustomStyle.jsx";

const PersonnelTabColumn = ({ count, onIncrease, onDecrease }) => {
  const dispatch = useDispatch();

  const onIncreaseCount = (actionFunc) => {
    if (count === MAX_COUNT) {
      return;
    }
    dispatch(actionFunc());
  };

  const onDecreaseCount = (actionFunc) => {
    if (count <= MIN_COUNT) {
      return;
    }
    dispatch(actionFunc());
  };

  return (
    <Column>
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
    </Column>
  );
};

const MIN_COUNT = 0;
const MAX_COUNT = 8;

const Column = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 20px;
  border-radius: 5%;
`;

export default PersonnelTabColumn;
