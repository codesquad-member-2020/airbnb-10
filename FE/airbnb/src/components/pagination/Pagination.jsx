import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateCurrentPage } from "../../modules/pagination.js";

const Pagination = () => {
  const POST_PER_PAGE = 20;

  const dispatch = useDispatch();
  const {
    content: { total },
  } = useSelector((state) => state.roomsListReducer);
  const { startPage, endPage, currentPage } = useSelector(
    (state) => state.paginationReducer,
  );

  const totalPage = Math.ceil(total / POST_PER_PAGE);

  const totalPagenation = Array(totalPage)
    .fill()
    .map((_, index) => index + 1);

  const pagenation = totalPagenation.slice(startPage, endPage);

  const onClickPage = (pageNumber) => () => {
    dispatch(updateCurrentPage(pageNumber));
  };
  console.log(currentPage);

  return (
    <div>
      <ul>
        {pagenation.map((pageNumber) => (
          <li>
            <button onClick={onClickPage(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
