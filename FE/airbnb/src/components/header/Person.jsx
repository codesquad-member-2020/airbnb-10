import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { increaseAdultCount } from "../../modules/person";

const Person = () => {
  const [isClick, setIsClick] = useState(false);

  const { adultCount, childCount, babyCount, totalCount } = useSelector((state) => state);
  const dispatch = useDispatch();

  const increaseCount = () => {
    dispatch(increaseAdultCount());
  };

  const clickPersonBtn = () => {
    if (!isClick) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  };

  return (
    <div>
      <button onClick={clickPersonBtn}>인원</button>
      {isClick && (
        <Personnel>
          <PlusBtn>+</PlusBtn>
        </Personnel>
      )}
    </div>
  );
};

const Personnel = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
`;

const PlusBtn = styled.button``;

export default Person;
