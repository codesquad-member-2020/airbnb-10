import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonnelTabColumn from "./PersonnelTabColumn.jsx";
import ModalButtons from "../ModalButtons.jsx";

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
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef();
  const dispatch = useDispatch();

  const { adultCount, childCount, babyCount, totalCount } = useSelector(
    (state) => state.personnelReducer,
  );

  const judgeCurrentPersonnel = () => {
    if (totalCount > MIN_COUNT) {
      return `게스트 ${adultCount + childCount}명,유아 ${babyCount}명 `;
    } else {
      return "인원";
    }
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const onClickOutsideHandler = () => {
    if (isOpen && !toggleContainer.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onClickResetHandler = () => {
    dispatch(resetCount());
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
  });

  return (
    <PersonnelWrap ref={toggleContainer}>
      <Button onClick={onClickHandler}>{judgeCurrentPersonnel()}</Button>
      {isOpen && (
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

          <ModalButtons
            resetHandler={onClickResetHandler}
            width="85"
            height="20"
          />
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

export default Personnel;
