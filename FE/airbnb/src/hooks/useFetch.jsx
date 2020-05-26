import { useEffect } from "react";

const useFetch = (url) => {
  //actionFunc, dispatch
  const initialFetch = async () => {
    const response = await fetch(url);
    const initialData = await response.json();
    // dispatch(actionFunc(initialData));
    console.log(initialData);
  };
  useEffect(() => {
    initialFetch();
  }, []);
};

export default useFetch;
