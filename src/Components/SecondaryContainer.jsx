import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) {
    return null;
  }

  return (
     <section
      className="
        relative
        z-20
        -mt-16
        bg-black

        pt-2
        pb-8

        sm:-mt-20
        md:-mt-24
        md:pt-3
      "
    >

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

   
        </section>
  );
};

export default SecondaryContainer;