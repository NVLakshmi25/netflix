import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API_OPTIONS } from "../Utils/Constants";
import { addUpcomingMovies } from "../Utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
    const upcomingMovies = useSelector(store =>store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {

    try {

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );

      if (!response.ok) {

        const errorData = await response.json();

        console.error("TMDB Upcoming API Error:", errorData);

        return;
      }

      const json = await response.json();

      console.log("Upcoming Movies:", json.results);

      dispatch(addUpcomingMovies(json.results));

    } catch (error) {

      console.error("Upcoming Fetch Error:", error);

    }
  };

  useEffect(() => {
   !upcomingMovies && getUpcomingMovies();
  }, []);

};

export default useUpcomingMovies;