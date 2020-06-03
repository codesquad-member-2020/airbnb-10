import { useEffect } from "react";

const useFetch = (url, actionFunc, dispatch) => {
  const initialFetch = async () => {
    try {
      const response = await fetch(url);
      const initialData = await response.json();
      dispatch(actionFunc(initialData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initialFetch();
  }, []);
};

export default useFetch;
