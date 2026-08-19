import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API_OPTIONS } from "../Utils/Constants";
import { addTrendingMovies } from "../Utils/movieSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies =useSelector(store =>store.movies.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        const errorData = await response.json();

        console.error("TMDB API Error:", errorData);

        return;
      }

      const json = await response.json();

      console.log("trending Movies:", json.results);

      dispatch(addTrendingMovies(json.results));

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
   !trendingMovies && getTrendingMovies();
  }, []);

};

export default useTrendingMovies;