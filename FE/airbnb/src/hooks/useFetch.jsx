import { useEffect } from "react";

const useFetch = (url, actionFunc, dispatch) => {
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

export default useFetch;
