import { useContext, useEffect } from 'react';
import useSWR from 'swr';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useInfiniteScrollData = (url: string, param: string) => {
  const { data, error, mutate } = useSWR([url, param], fetchData);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const isBottomReached = scrollTop + clientHeight >= scrollHeight - 5;

      if (isBottomReached && !error) {
        // Fetch the next page of data
        const nextSkip = data ? data.skip + 10 : 0;
        const nextPageUrl = `${url}?limit=20&skip=${nextSkip}`;
        mutate((prevData: any) => ({ ...prevData, skip: nextSkip }), false);
        mutate(nextPageUrl);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, error, mutate, url]);

  return { data, error };
};

export default useInfiniteScrollData;
