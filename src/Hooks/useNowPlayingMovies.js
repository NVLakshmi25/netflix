import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { API_OPTIONS } from "../Utils/Constants";
import { addNowPlayingMovies } from "../Utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

const nowPlayingMovies =useSelector(store =>store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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

      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
   
  !nowPlayingMovies && getNowPlayingMovies();
  }, []);

};

export default useNowPlayingMovies;