import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies } from "../Utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  
const popularMovies =useSelector(store =>store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        const errorData = await response.json();

        console.error("TMDB API Error:", errorData);

        return;
      }

      const json = await response.json();

      console.log("Popular Movies:", json.results);

      dispatch(addPopularMovies(json.results));

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
  !popularMovies && getPopularMovies();
  }, []);

};

export default usePopularMovies;