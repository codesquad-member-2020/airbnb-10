import React from "react";

import styled from "styled-components";

const PaginationBtn = ({ name, onClickHandler }) => {
  return (
    <PaginationBtnWrap>
      <button onClick={onClickHandler}>{name}</button>
    </PaginationBtnWrap>
  );
};

const PaginationBtnWrap = styled.li`
  & button {
    outline: none;
    cursor: pointer;
  }
`;

export default PaginationBtn;
