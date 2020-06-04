import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import querystring from "query-string";

import {
  updateCurrentPage,
  updateStartEndPage,
} from "../../modules/pagination.js";

const Pagination = ({ location }) => {
  const POST_PER_PAGE = 20;
  const LAST_INDEX = 10;

  const url = process.env.REACT_APP_ROOMS_DB_HOST;
  const [pagination, setPagination] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    roomsListReducer: {
      content: { total },
    },
    paginationReducer: { startPage, endPage, currentPage },
  } = useSelector((state) => state);

  const totalPage = Math.ceil(total / POST_PER_PAGE);

  const totalPageNumbers = Array(totalPage)
    .fill()
    .map((_, index) => index + 1);

  let pageNumbers = totalPageNumbers.slice(startPage, endPage);
  const TOTAL_LAST_INDEX = totalPageNumbers.length;

  const onClickPage = (pageNumber) => () => {
    const search = location.search;
    let offset = POST_PER_PAGE * pageNumber - POST_PER_PAGE;

    dispatch(updateCurrentPage(pageNumber));
    //params 변경
    // const params = querystring.parse(search);
    // console.log(params);
    // if (params.offset) {
    //   params.offset = offset;
    //   console.log(params);
    //   history.push(querystring.stringify(params));

    //   //offset 변경 방법은?
    // } else history.push(`${search}&offset=${offset}`);

    //fetch작업
  };

  const onClickPrev = () => {
    const FIRST_PAGE = 1;

    if (currentPage === FIRST_PAGE) return;
    if (currentPage % LAST_INDEX === FIRST_PAGE) {
      const start = startPage - LAST_INDEX;
      const end = endPage - LAST_INDEX;

      changePagination(start, end);
    }
    dispatch(updateCurrentPage(currentPage - 1));
  };

  const onClickNext = () => {
    const CURRENT_LAST_PAGE = 0;

    if (currentPage === TOTAL_LAST_INDEX) return;

    if (currentPage % LAST_INDEX === CURRENT_LAST_PAGE) {
      const start = startPage + LAST_INDEX;
      const end = endPage + LAST_INDEX;
      changePagination(start, end);
    }
    dispatch(updateCurrentPage(currentPage + 1));
  };

  const checkLastIndex = (index) => {
    if (currentPage === TOTAL_LAST_INDEX) return;
    const start = startPage + index;
    const end = endPage + index;
    changePagination(start, end);
  };

  const changePagination = (start, end) => {
    pageNumbers = totalPageNumbers.slice(start, end);
    setPagination(true);
    dispatch(updateStartEndPage(start, end));
  };

  const onClickStart = () => {
    dispatch(updateCurrentPage(1));
    changePagination(0, LAST_INDEX);
  };

  const onClickEnd = () => {
    dispatch(updateCurrentPage(TOTAL_LAST_INDEX));
    checkLastIndex(LAST_INDEX);
  };

  console.log(currentPage);

  return (
    <div>
      <ul>
        <li>
          <button onClick={onClickStart}>처음</button>
        </li>
        <li>
          <button onClick={onClickPrev}>이전</button>
        </li>
        {pagination &&
          pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button onClick={onClickPage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
        <li>
          <button onClick={onClickNext}>다음</button>
        </li>
        <li>
          <button onClick={onClickEnd}>끝</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
