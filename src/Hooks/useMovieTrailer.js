import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTrailerVideo } from "../Utils/movieSlice";

const useMovieTrailer = ({ movieId }) => {

  const dispatch = useDispatch();
   const trailerVideo =useSelector(store =>store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("TMDB Video API Error:", errorData);
        return;
      }

      const json = await response.json();

      console.log("VIDEO RESULTS:", json.results);

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );

      const trailer = filterData.length
        ? filterData[0]
        : json.results[0];

      if (trailer) {
        console.log("SELECTED TRAILER:", trailer);
        dispatch(addTrailerVideo(trailer));
      }

    } catch (error) {
      console.error("Trailer Fetch Error:", error);
    }
  };

  useEffect(() => {

    if (movieId) {
     !trailerVideo && getMovieVideos();
    }

  }, [movieId]);

};

export default useMovieTrailer;