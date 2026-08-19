import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  if (!movies || movies.length === 0) {
    return null;
  }


  return (

    <section
      className="
        mb-7
        w-full

        sm:mb-8

        md:mb-10

        lg:mb-12
      "
    >

      {/* =====================================
          TITLE
      ====================================== */}

      <h2
        className="
          mb-3
          px-1

          text-lg
          font-bold
          text-white

          sm:text-xl

          md:mb-4
          md:text-2xl

          lg:text-3xl
        "
      >
        {title}
      </h2>


      {/* =====================================
          MOVIE ROW
      ====================================== */}

      <div
        className="
          flex
          w-full

          gap-2

          overflow-x-auto
          overflow-y-hidden

          scroll-smooth

          pb-4

          sm:gap-3

          md:gap-4

          lg:gap-5

          scrollbar-hide
        "
      >

        {movies.map((movie) => (

          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
          />

        ))}

      </div>

    </section>

  );
};

export default MovieList;