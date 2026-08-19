



import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API_OPTIONS } from "../Utils/Constants";
import { addHorrorMovies } from "../Utils/movieSlice";

const useHorrorMovies = () => {
  const dispatch = useDispatch();

  const horrorMovies =useSelector(store =>store.movies.horrorMovies);



  const getHorrorMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );

    //   console.log("TMDB Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();

        console.error("TMDB API Error:", errorData);

        return;
      }

      const json = await response.json();

    //   console.log("TMDB Response:", json);
    //   console.log("Movies:", json.results);

      dispatch(addHorrorMovies(json.results));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
   !horrorMovies && getHorrorMovies();
  }, []);

};

export default useHorrorMovies;