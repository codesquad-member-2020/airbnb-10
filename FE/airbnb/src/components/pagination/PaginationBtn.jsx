import React from "react";

const PaginationBtn = ({ name, onClickHandler }) => {
  return (
    <li>
      <button onClick={onClickHandler}>{name}</button>
    </li>
  );
};

export default PaginationBtn;
