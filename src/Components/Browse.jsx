import React from "react";

import { useSelector } from "react-redux";

import Header from "./Header";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTrendingMovies from "../Hooks/useTrendingMovies";
import useHorrorMovies from "../Hooks/useHorrorMovies";

import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";


const Browse = () => {

  const showGptSearch = useSelector(
    (store) => store.gpt.showGptSearch
  );


  // ==========================================
  // MOVIE API CALLS
  // ==========================================

  useNowPlayingMovies();

  usePopularMovies();

  useTrendingMovies();

  useHorrorMovies();


  return (

    <main
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-black
      "
    >

      {/* =====================================
          HEADER
      ====================================== */}

      <Header />


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      {showGptSearch ? (

        <div
          className="
            min-h-screen
            w-full
            overflow-x-hidden
            bg-black
          "
        >

          <GptSearch />

        </div>

      ) : (

        <div
          className="
            w-full
            overflow-x-hidden
            bg-black
          "
        >

          {/* HERO */}

          <MainContainer />


          {/* MOVIE ROWS */}

          <SecondaryContainer />

        </div>

      )}

    </main>

  );
};

export default Browse;