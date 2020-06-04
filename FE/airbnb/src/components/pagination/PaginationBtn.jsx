import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

const PaginationBtn = ({ name, className, onClickHandler }) => {
  const { currentPage } = useSelector((state) => state.paginationReducer);
  return (
    <PaginationBtnWrap currentPage={currentPage}>
      <button className={className} onClick={onClickHandler}>
        {name}
      </button>
    </PaginationBtnWrap>
  );
};

const PaginationBtnWrap = styled.li`
  & button {
    display: inline-block;
    outline: none;
    padding: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: var(--box-shadow);
      outline: 1px solid var(--gray-1);
    }
  }

  & button.active-page {
    background-color: red;
  }
`;

export default PaginationBtn;
