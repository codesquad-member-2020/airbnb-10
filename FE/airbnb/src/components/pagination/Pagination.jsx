import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import querystring from "query-string";

import PaginationBtn from "./PaginationBtn.jsx";

import {
  updateCurrentPage,
  updateStartEndPage,
  updateActive,
} from "../../modules/pagination.js";

import _ from "../../util/util.js";

import { DefaultLayout } from "../../style/CustomStyle.jsx";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = memo(({ location }) => {
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

  const search = location.search;
  const parsed = querystring.parse(search);
  const pageOffeset = parsed.itemsOffset;

  useEffect(() => {
    if (pageOffeset) {
      const currentPageNumber = pageOffeset / POST_PER_PAGE + 1;
      const firstDigit = Math.floor(currentPageNumber * 0.1);
      const currentStartPage =
        currentPageNumber % INDEXES_PER_PAGE === 0
          ? currentPageNumber - INDEXES_PER_PAGE
          : parseInt(firstDigit + "0");

      const currentEndPage = currentStartPage + INDEXES_PER_PAGE;

      changePagination(currentStartPage, currentEndPage);
      dispatch(updateCurrentPage(currentPageNumber));
    }
  }, []);

  const onClickPage = (pageNumber) => () => {
    scroll(0, 0);

    dispatch(updateActive(true));
    dispatch(updateCurrentPage(pageNumber));

    changeQuery(pageNumber);
  };

  const changeQuery = (pageNumber) => {
    const currentOffset = POST_PER_PAGE * pageNumber - POST_PER_PAGE;

    if (!pageOffeset && !search) {
      const initialQueryString = _.createInitialQueryString();
      const offsetQueryString = `&itemsOffset=${currentOffset}`;

      history.push(`/rooms${initialQueryString + offsetQueryString}`);
    } else {
      parsed["itemsOffset"] = currentOffset;
      history.push(`/rooms?${querystring.stringify(parsed)}`);
    }
  };

  const updatePageAndQuery = (page) => {
    dispatch(updateCurrentPage(page));
    changeQuery(page);
  };

  const ONE_STEP = 1;

  const onClickPrev = () => {
    const FIRST_PAGE = 1;
    if (currentPage === FIRST_PAGE) return;

    scroll(0, 0);

    if (currentPage % INDEXES_PER_PAGE === FIRST_PAGE) {
      const start = startPage - INDEXES_PER_PAGE;
      const end = endPage - INDEXES_PER_PAGE;
      changePagination(start, end);
    }

    updatePageAndQuery(currentPage - ONE_STEP);
  };

  const onClickNext = () => {
    if (currentPage === TOTAL_INDEXES) return;

    const CURRENT_LAST_INDEX = 0;
    scroll(0, 0);

    if (currentPage % INDEXES_PER_PAGE === CURRENT_LAST_INDEX) {
      const start = startPage + INDEXES_PER_PAGE;
      const end = endPage + INDEXES_PER_PAGE;

      changePagination(start, end);
    }
    updatePageAndQuery(currentPage + ONE_STEP);
  };

  const changePagination = (start, end) => {
    pageNumbers = totalPageNumbers.slice(start, end);
    setPagination(true);
    dispatch(updateStartEndPage(start, end));
  };

  const onClickFirst = () => {
    const FIRST_INDEX = 1;
    scroll(0, 0);

    updatePageAndQuery(FIRST_INDEX);

    changePagination(0, INDEXES_PER_PAGE);
  };

  const onClickLast = () => {
    if (currentPage === TOTAL_INDEXES) return;
    scroll(0, 0);

    const firstIndexOfLastPage =
      TOTAL_INDEXES % INDEXES_PER_PAGE === 0
        ? (Math.floor(TOTAL_INDEXES / INDEXES_PER_PAGE) - 1) * INDEXES_PER_PAGE
        : Math.floor(TOTAL_INDEXES / INDEXES_PER_PAGE) * INDEXES_PER_PAGE;

    updatePageAndQuery(TOTAL_INDEXES);

    const lastIndexOfLastPage = firstIndexOfLastPage + INDEXES_PER_PAGE;
    changePagination(firstIndexOfLastPage, lastIndexOfLastPage);
  };

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
});

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  & ul {
    ${DefaultLayout}
  }
  & li {
    margin: 0 10px;
  }
`;

export default Pagination;
