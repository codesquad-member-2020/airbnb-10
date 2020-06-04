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
  const INDEXES_PER_PAGE = 10;

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
  const TOTAL_INDEXES = totalPageNumbers.length;

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
    if (currentPage % INDEXES_PER_PAGE === FIRST_PAGE) {
      const start = startPage - INDEXES_PER_PAGE;
      const end = endPage - INDEXES_PER_PAGE;

      changePagination(start, end);
    }
    dispatch(updateCurrentPage(currentPage - 1));
  };

  const onClickNext = () => {
    const CURRENT_LAST_INDEX = 0;

    if (currentPage === TOTAL_INDEXES) return;

    if (currentPage % INDEXES_PER_PAGE === CURRENT_LAST_INDEX) {
      const start = startPage + INDEXES_PER_PAGE;
      const end = endPage + INDEXES_PER_PAGE;
      changePagination(start, end);
    }
    dispatch(updateCurrentPage(currentPage + 1));
  };

  const changePagination = (start, end) => {
    pageNumbers = totalPageNumbers.slice(start, end);
    setPagination(true);
    dispatch(updateStartEndPage(start, end));
  };

  const onClickStart = () => {
    const FIRST_INDEX = 1;

    dispatch(updateCurrentPage(FIRST_INDEX));
    changePagination(0, INDEXES_PER_PAGE);
  };

  const onClickEnd = () => {
    const firstIndexOfLastPage = Math.floor(total / POST_PER_PAGE);

    dispatch(updateCurrentPage(TOTAL_INDEXES));
    changePagination(firstIndexOfLastPage, TOTAL_INDEXES);
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
