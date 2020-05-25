import React, { useState } from "react";
import { useSelector } from "react-redux";
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
} from "../../../modules/personnel.js";

const Personnel = () => {
  const [isClick, setIsClick] = useState(false);

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

  return (
    <Test>
      <Button onClick={clickPersonBtn}>{judgeCurrentPersonnel()}</Button>
      {isClick && (
        <PersonnelWrap>
          <PersonnelTabColumn
            count={adultCount}
            onIncrease={increaseAdultCount}
            onDecrease={decreaseAdultCount}
          />
          <PersonnelTabColumn
            count={childCount}
            onIncrease={increaseChildCount}
            onDecrease={decreaseChildCount}
          />
          <PersonnelTabColumn
            count={babyCount}
            onIncrease={increaseBabyCount}
            onDecrease={decreaseBabyCount}
          />
        </PersonnelWrap>
      )}
    </Test>
  );
};

const MIN_COUNT = 0;

const Test = styled.div`
  padding-left: 20px;
`;

const PersonnelWrap = styled(ToggleWrap)`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 350px;
`;

export default Personnel;