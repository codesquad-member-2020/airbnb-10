import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import querystring from "query-string";

import {
  updateCurrentPage,
  updateStartEndPage,
} from "../../modules/pagination.js";

import _ from "../../util/util.js";

const Pagination = ({ location }) => {
  const POST_PER_PAGE = 20;
  const LASE_PAGE = 10;

  const url = process.env.REACT_APP_ROOMS_DB_HOST;

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    roomsListReducer: {
      content: { total },
    },
    paginationReducer: { startPage, endPage, currentPage },
  } = useSelector((state) => state);

  const totalPage = Math.ceil(total / POST_PER_PAGE);

  const totalPagenation = Array(totalPage)
    .fill()
    .map((_, index) => index + 1);

  const pagenation = totalPagenation.slice(startPage, endPage);

  const onClickPage = (pageNumber) => () => {
    const search = location.search;
    const parsed = querystring.parse(search);
    let currentOffset = POST_PER_PAGE * pageNumber - POST_PER_PAGE;

    dispatch(updateCurrentPage(pageNumber));

    if (!parsed.itemsOffset && !search) {
      const initialQueryString = _.createInitialQueryString();
      const offsetQueryString = `&itemsOffset=${currentOffset}`;
      _.moveToScrollStartPoint();
      history.push(`/rooms${initialQueryString + offsetQueryString}`);
    } else {
      parsed["itemsOffset"] = currentOffset;
      _.moveToScrollStartPoint();
      history.push(`/rooms?${querystring.stringify(parsed)}`);
    }
  };

  const onClickPrev = (pageNumber) => () => {
    // if (currentPage === 1) return;
    // if (currentPage % LASE_PAGE === 1) {
    //   const start = startPage - LASE_PAGE;
    //   const end = endPage - LASE_PAGE;
    //   dispatch(updateStartEndPage(start, end));
    // }
    // dispatch(updateCurrentPage(pageNumber - 1));

    //이전 버튼 구현하기
    console.log("이전");
  };

  return (
    <div>
      <ul>
        <li>
          <button onClick={onClickPrev()}>이전</button>
        </li>
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
