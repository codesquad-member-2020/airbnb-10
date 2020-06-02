import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetch = (url, actionFunc) => {
  const dispatch = useDispatch();

  const initialFetch = async () => {
    const response = await fetch(url);
    const initialData = await response.json();
    console.log(initialData);
    dispatch(actionFunc(initialData));
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

export default useFetch;
