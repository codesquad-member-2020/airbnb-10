import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { personnelCounts } from "../../../modules/personnel.js";

import { Button, CountButton, ToggleWrap } from "../../../style/CustomStyle.jsx";

const Personnel = () => {
  const [isClick, setIsClick] = useState(false);

  const { adultCount, childCount, babyCount, totalCount } = useSelector((state) => state.personReducer);
  const dispatch = useDispatch();

  const clickPersonBtn = () => {
    if (!isClick) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  };

  const increaseAdult = () => {
    if (adultCount === 8) {
      return;
    }
    dispatch(personnelCounts.increaseAdultCount());
  };

  const decreaseAdult = () => {
    if (adultCount <= 0) {
      return;
    }
    dispatch(personnelCounts.decreaseAdultCount());
  };

  return (
    <Test>
      <Button onClick={clickPersonBtn}>인원</Button>
      {isClick && (
        <PersonnelWrap>
          <Line>
            <CountButton onClick={decreaseAdult}>-</CountButton>
            <div>{adultCount}</div>
            <CountButton onClick={increaseAdult}>+</CountButton>
          </Line>
        </PersonnelWrap>
      )}
    </Test>
  );
};

const Test = styled.div`
  padding-left: 20px;
`;

const Line = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 20px;
  border-radius: 5%;
`;

const PersonnelWrap = styled(ToggleWrap)`
  width: 400px;
  height: 350px;
`;

const PlusBtn = styled.button``;

export default Personnel;
