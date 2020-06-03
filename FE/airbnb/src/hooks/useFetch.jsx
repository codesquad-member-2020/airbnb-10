import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import { resetPrices } from "../modules/price";
import querystring from "query-string";
import _ from "../util/util.js";
import useUpdateStore from "./useUpdateStore.jsx";

const useFetch = (url, actionFunc) => {
  const dispatch = useDispatch();

  const initialFetch = async () => {
    try {
      const response = await fetch(url);
      const initialData = await response.json();
      console.log(initialData);
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
  console.log(data, "data");
  return data;
};

export const useRoomsFetch = (actionFunc, searchQuery) => {
  const dispatch = useDispatch();
  const { startDate } = useSelector((state) => state.dateReducer);
  const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

  let requsetUrl = null;

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
  useEffect(() => {
    fetchRooms();
  }, [searchQuery]);

  const fetchRooms = async () => {
    const response = await fetch(requsetUrl);
    const data = await response.json();

    dispatch(actionFunc(data));
  };
};

export default useFetch;
