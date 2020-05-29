import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { fetchInitialData } from "../../modules/roomsList.js";
import { useDispatch, useSelector } from "react-redux";

const Rooms = () => {
  const dispatch = useDispatch();

  const getDate = (tomorrow) => {
    const today = new Date();
    if (tomorrow) today.setDate(today.getDate() + 1);

    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${year}-${month}-${day}`;
  };

  const getInitialUrl = () => {
    const today = getDate();
    const tomorrow = getDate(true);
    const initialUrl = `http://15.165.117.230/api/mock/rooms?checkIn=${today}&checkOut=${tomorrow}`;
    return initialUrl;
  };

  useFetch(getInitialUrl(), fetchInitialData, dispatch);
  const { content } = useSelector((state) => state.roomsListReducer);

  return <div></div>;
};

export default Rooms;
