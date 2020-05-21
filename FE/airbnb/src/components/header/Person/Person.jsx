import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { personnelCounts } from "../../../modules/person";

import { Button, CountButton } from "../../../style/CustomStyle.jsx";

const Person = () => {
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
        <Personnel>
          <CountButton onClick={decreaseAdult}>-</CountButton>
          <div>{adultCount}</div>
          <CountButton onClick={increaseAdult}>+</CountButton>
        </Personnel>
      )}
    </Test>
  );
};

const Test = styled.div`
  padding-left: 20px;
`;

const Personnel = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 10%;
  border: 1px solid var(--gray-1);
`;

const PlusBtn = styled.button``;

export default Person;
