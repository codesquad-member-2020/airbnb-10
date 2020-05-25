import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonnelTabColumn from "./PersonnelTabColumn.jsx";

import styled from "styled-components";
import { Button, ToggleWrap } from "../../../style/CustomStyle.jsx";

import {
  increaseAdultCount,
  decreaseAdultCount,
  increaseChildCount,
  decreaseChildCount,
  increaseBabyCount,
  decreaseBabyCount,
  resetCount,
} from "../../../modules/personnel.js";

const Personnel = () => {
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();

  const { adultCount, childCount, babyCount, totalCount } = useSelector(
    (state) => state.personnelReducer,
  );

  const clickPersonBtn = () => {
    if (!isClick) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  };

  const judgeCurrentPersonnel = () => {
    if (totalCount > MIN_COUNT) {
      return `게스트 ${adultCount + childCount}명,유아 ${babyCount}명 `;
    } else {
      return "인원";
    }
  };

  const resetSelectPersonnel = () => {
    dispatch(resetCount());
  };

  return (
    <PersonnelWrap>
      <Button onClick={clickPersonBtn}>{judgeCurrentPersonnel()}</Button>
      {isClick && (
        <PersonnelModalWrap>
          <PersonnelTabColumn
            count={adultCount}
            onIncrease={increaseAdultCount}
            onDecrease={decreaseAdultCount}
            personnelType="성인"
            personnelScope="만 13세 이상"
          />
          <PersonnelTabColumn
            count={childCount}
            onIncrease={increaseChildCount}
            onDecrease={decreaseChildCount}
            personnelType="어린이"
            personnelScope="2 ~ 12세"
          />
          <PersonnelTabColumn
            count={babyCount}
            onIncrease={increaseBabyCount}
            onDecrease={decreaseBabyCount}
            personnelType="유아"
            personnelScope="2세 미만"
          />
          <BottomArea>
            <ResetButton onClick={resetSelectPersonnel}>지우기</ResetButton>
            <SaveButton>저장</SaveButton>
          </BottomArea>
        </PersonnelModalWrap>
      )}
    </PersonnelWrap>
  );
};

const MIN_COUNT = 0;

const PersonnelWrap = styled.div`
  position: relative;
  padding-left: 20px;
`;

const PersonnelModalWrap = styled(ToggleWrap)`
  margin-top: 5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 350px;
`;

const BottomArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  height: 20%;
`;

const ResetButton = styled.button`
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
`;

const SaveButton = styled.div`
  font-size: 0.8rem;
  text-align: center;
  color: var(--white);
  background-color: black;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
`;

export default Personnel;
