import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import querystring from "query-string";
import _ from "../util/util.js";
import useUpdateStore from "./useUpdateStore.jsx";

import {
  fetchInitialData,
  fetchAccommodationsData,
} from "../modules/roomsList.js";
import { updateActive } from "../modules/pagination.js";

const useFetch = (url, actionFunc) => {
  const dispatch = useDispatch();

  const initialFetch = async () => {
    try {
      const response = await fetch(url);
      const initialData = await response.json();
      dispatch(actionFunc(initialData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);
};

export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const useRoomsFetch = (searchQuery) => {
  const dispatch = useDispatch();
  const {
    dateReducer: { startDate },
    paginationReducer: { paginationActive },
  } = useSelector((state) => state);

  const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

  let requsetUrl = null;

  const setRequsetQueryString = () => {
    if (!searchQuery) {
      //query string none
      requsetUrl = _.createInitialRequsetURL();
    } else if (searchQuery && !startDate) {
      // query string Exist store state none
      const parsed = querystring.parse(searchQuery);
      requsetUrl = ROOMS_DB_HOST + searchQuery;
      useUpdateStore(dispatch, parsed);
    } else {
      // query string Exist store state Exist
      requsetUrl = ROOMS_DB_HOST + searchQuery;
    }
  };

  const fetchRooms = async () => {
    const response = await fetch(requsetUrl);
    const data = await response.json();

    if (!paginationActive) {
      dispatch(fetchInitialData(data));
    } else {
      dispatch(updateActive(false));
      dispatch(fetchAccommodationsData(data));
    }
  };

  useEffect(() => {
    setRequsetQueryString();
    fetchRooms();
  }, [searchQuery]);
};

export default useFetch;
