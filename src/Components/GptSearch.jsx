import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { Bg_Netflix_url } from "../Utils/Constants";

const GptSearch = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-black
      "
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================== */}

      <img
        src={Bg_Netflix_url}
        alt="Netflix background"
        className="
          fixed
          inset-0
          z-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* =========================
          DARK OVERLAY
      ========================== */}

      <div
        className="
          fixed
          inset-0
          z-10
          bg-black/70

          sm:bg-black/65

          md:bg-black/60
        "
      ></div>

      {/* =========================
          CONTENT
      ========================== */}

      <main
        className="
          relative
          z-20
          min-h-screen
          w-full

          px-3
          pt-24
          pb-10

          sm:px-5
          sm:pt-28
          sm:pb-12

          md:px-8
          md:pt-32

          lg:px-10
          lg:pt-36

          xl:px-12
          xl:pt-40
        "
      >
        {/* =========================
            SEARCH SECTION
        ========================== */}

        <section
          className="
            mx-auto
            w-full
            max-w-3xl

            md:max-w-4xl

            lg:max-w-5xl

            xl:max-w-6xl
          "
        >
          <GptSearchBar />
        </section>

        {/* =========================
            MOVIE SUGGESTIONS
        ========================== */}

        <section
          className="
            mx-auto
            mt-6
            w-full
            max-w-screen-2xl

            sm:mt-8

            md:mt-10

            lg:mt-12
          "
        >
          <GptMovieSuggestions />
        </section>
      </main>
    </div>
  );
};

export default GptSearch;