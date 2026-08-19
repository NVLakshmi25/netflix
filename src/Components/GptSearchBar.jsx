import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import lang from "../Utils/LanguageConstants";
import { API_OPTIONS } from "../Utils/Constants";
import { addGptMovieResults } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector(
    (store) => store.config.lang
  );

  const searchText = useRef(null);

  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // SEARCH MOVIE IN TMDB
  // ------------------------------------

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("TMDB request failed");
      }

      const json = await response.json();

      return json.results || [];
    } catch (error) {
      console.error("TMDB Error:", error);

      return [];
    }
  };

  // ------------------------------------
  // GPT SEARCH
  // ------------------------------------

  const handleGptSearchClick = async (e) => {
    e.preventDefault();

    const userQuery = searchText.current?.value.trim();

    if (!userQuery) {
      return;
    }

    try {
      setLoading(true);

      console.log("User Query:", userQuery);

      // ------------------------------------
      // 1. CALL OUR BACKEND
      // ------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/gpt-search",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: userQuery,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend GPT request failed");
      }

      const data = await response.json();

      console.log("GPT Movies:", data.movies);

      // ------------------------------------
      // 2. SEARCH EACH MOVIE IN TMDB
      // ------------------------------------

      const promiseArray = data.movies.map((movie) =>
        searchMovieTMDB(movie)
      );

      const tmdbResults = await Promise.all(
        promiseArray
      );

      console.log("TMDB Results:", tmdbResults);

      // ------------------------------------
      // 3. SAVE RESULTS TO REDUX
      // ------------------------------------

      dispatch(
        addGptMovieResults({
          movieNames: data.movies,
          movieResults: tmdbResults,
        })
      );

      console.log(
        "GPT movie results stored in Redux"
      );
    } catch (error) {
      console.error("GPT Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-[65vh]
        w-full
        items-center
        justify-center
        px-3
        py-8

        sm:px-5

        md:min-h-[60vh]
        md:px-8

        lg:px-10

        xl:px-12
      "
    >
      <form
        onSubmit={handleGptSearchClick}
        className="
          flex
          w-full
          max-w-3xl
          flex-col
          gap-3

          sm:max-w-4xl

          md:flex-row
          md:gap-0

          lg:max-w-5xl

          xl:max-w-6xl
        "
      >
        {/* ==============================
            SEARCH INPUT
        =============================== */}

        <div
          className="
            relative
            w-full
            md:flex-1
          "
        >
          {/* Search Icon */}

          <span
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2
              text-lg
              text-gray-400

              sm:left-5
              sm:text-xl

              md:left-5
              md:text-2xl
            "
          >
            🔍
          </span>

          {/* Input */}

          <input
            ref={searchText}
            type="text"
            placeholder={
              lang[selectedLanguage]
                ?.gptSearchPlaceholder ||
              "What would you like to watch today?"
            }
            disabled={loading}
            className="
              h-14
              w-full
              rounded-xl
              border
              border-white/30
              bg-black/80
              pl-12
              pr-4
              text-base
              text-white
              outline-none
              backdrop-blur-lg
              placeholder:text-gray-400
              transition-all
              duration-300

              focus:border-white
              focus:bg-black

              disabled:cursor-not-allowed
              disabled:opacity-70

              sm:h-15
              sm:pl-14
              sm:pr-5
              sm:text-lg

              md:h-16
              md:rounded-l-2xl
              md:rounded-r-none
              md:pl-14
              md:pr-6
              md:text-lg

              lg:text-xl
            "
          />
        </div>

        {/* ==============================
            SEARCH BUTTON
        =============================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            h-14
            w-full
            rounded-xl
            bg-red-600
            px-5
            text-base
            font-bold
            text-white
            shadow-lg
            transition-all
            duration-300

            hover:bg-red-700
            hover:scale-[1.01]

            active:scale-[0.98]

            disabled:cursor-not-allowed
            disabled:bg-gray-600
            disabled:hover:scale-100

            sm:h-15
            sm:px-8
            sm:text-lg

            md:h-16
            md:w-auto
            md:min-w-[150px]
            md:rounded-l-none
            md:rounded-r-2xl
            md:px-8

            lg:min-w-[170px]
            lg:px-10
          "
        >
          {loading
            ? "Searching..."
            : lang[selectedLanguage]?.search ||
              "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;