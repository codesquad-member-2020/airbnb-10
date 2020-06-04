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
    padding: 7px 11px;
    border-radius: 3px;
    transition: all 200ms;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;

    &:hover {
      box-shadow: 0 5px 8px rgba(33, 150, 243, 0.25);
      background: #00bcd4;
      background: -webkit-linear-gradient(left, #00bcd4 0%, #2196f3 100%);
      background: linear-gradient(to right, #00bcd4 0%, #2196f3 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00BCD4',endColorstr='#2196F3',GradientType=1);
      background-size: 400%;
      -webkit-animation: Gradient 1s ease infinite;
      animation: Gradient 1s ease infinite;
    }
    @keyframes Gradient {
      0% {
        background-position: 0 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }
  }

  & button.active-page {
    background-color: #00bcd4;
    box-shadow: 0 5px 8px rgba(26, 35, 126, 0.25);
  }
`;

export default PaginationBtn;
