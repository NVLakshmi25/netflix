import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        w-full

        mb-6
        sm:mb-7
        md:mb-8
      "
    >
      {/* TITLE */}
      <h2
        className="
          mb-2
          px-4

          text-lg
          font-bold
          tracking-tight
          text-white

          sm:px-6
          sm:text-xl

          md:px-8
          md:text-2xl

          lg:text-[26px]
        "
      >
        {title}
      </h2>

      {/* MOVIE ROW */}
      <div
        className="
          flex
          w-full

          gap-2
          sm:gap-2.5
          md:gap-3

          overflow-x-auto
          overflow-y-hidden

          px-4
          sm:px-6
          md:px-8

          pb-3

          scroll-smooth

          snap-x
          snap-mandatory

          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="snap-start"
          >
            <MovieCard
              posterPath={movie.poster_path}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;