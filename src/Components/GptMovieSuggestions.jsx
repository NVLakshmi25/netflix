import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {

  const {
    movieNames,
    movieResults,
  } = useSelector((store) => store.gpt);


  // No GPT results
  if (
    !movieNames ||
    !movieResults ||
    movieNames.length === 0
  ) {
    return null;
  }


  return (

    <section
      className="
        relative
        z-20

        w-full

        bg-black/90

        px-3
        py-6

        sm:px-4
        sm:py-8

        md:px-6
        md:py-10

        lg:px-8
        lg:py-12

        xl:px-10
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
        "
      >

        {movieNames.map((movieName, index) => (

          <MovieList
            key={`${movieName}-${index}`}
            title={movieName}
            movies={movieResults[index]}
          />

        ))}

      </div>

    </section>

  );
};

export default GptMovieSuggestions;