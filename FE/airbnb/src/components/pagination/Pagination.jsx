import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import querystring from "query-string";

import PaginationBtn from "./PaginationBtn.jsx";

import {
  updateCurrentPage,
  updateStartEndPage,
} from "../../modules/pagination.js";

import { DefaultLayout } from "../../style/CustomStyle.jsx";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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

  console.log("render");
  const onClickPage = (pageNumber) => (event) => {
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

  const onClickFirst = () => {
    const FIRST_INDEX = 1;

    dispatch(updateCurrentPage(FIRST_INDEX));
    changePagination(0, INDEXES_PER_PAGE);
  };

  const onClickLast = () => {
    if (currentPage === TOTAL_INDEXES) return;

    const firstIndexOfLastPage =
      Math.floor(TOTAL_INDEXES / INDEXES_PER_PAGE) * 10;
    dispatch(updateCurrentPage(TOTAL_INDEXES));

    const lastIndexOfLastPage = firstIndexOfLastPage + 10;
    changePagination(firstIndexOfLastPage, lastIndexOfLastPage);
  };

  console.log(currentPage);

  const pageNumbersRender = () => {
    return pageNumbers.map((pageNumber) => (
      <PaginationBtn
        key={pageNumber}
        name={pageNumber}
        className={pageNumber === currentPage ? "active-page" : null}
        onClickHandler={onClickPage(pageNumber)}
      />
    ));
  };

  const prev = <FontAwesomeIcon icon={faChevronLeft} />;
  const next = <FontAwesomeIcon icon={faChevronRight} />;
  const first = <FontAwesomeIcon icon={faAngleDoubleLeft} />;
  const last = <FontAwesomeIcon icon={faAngleDoubleRight} />;

  return (
    <PaginationWrap>
      <ul>
        <PaginationBtn name={first} onClickHandler={onClickFirst} />
        <PaginationBtn name={prev} onClickHandler={onClickPrev} />
        {pagination && pageNumbersRender()}
        <PaginationBtn name={next} onClickHandler={onClickNext} />
        <PaginationBtn name={last} onClickHandler={onClickLast} />
      </ul>
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  & ul {
    ${DefaultLayout}
  }
  & li {
    margin: 0 10px;
  }
`;

export default Pagination;
