import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) {
    return null;
  }

  return (
    <div className="relative z-20 bg-black -mt-20 pb-16">

      <MovieList
        title="Now Playing"
        movies={movies.nowPlayingMovies}
      />

      <MovieList
        title="Trending"
        movies={movies.trendingMovies}
      />

      <MovieList
        title="Popular"
        movies={movies.popularMovies}
      />

      <MovieList
        title="Horror"
        movies={movies.horrorMovies}
      />

      <MovieList
        title="Upcoming Movies"
        movies={movies.upcomingMovies}
      />

    </div>
  );
};

export default SecondaryContainer;