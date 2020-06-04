import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const POST_PER_PAGE = 20;
  const {
    content: { total },
  } = useSelector((state) => state.roomsListReducer);
  const { startPage, endPage } = useSelector(
    (state) => state.paginationReducer,
  );

  const totalPage = Math.ceil(total / POST_PER_PAGE);

  const totalPagenation = Array(totalPage)
    .fill()
    .map((_, index) => index + 1);

  const pagenation = totalPagenation.slice(startPage, endPage);
  console.log(pagenation);

  return (
    <div>
      <ul>
        {pagenation.map((pageNumber) => (
          <li>
            <button>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
