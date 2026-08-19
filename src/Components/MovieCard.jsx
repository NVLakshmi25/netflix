import React from "react";
import { IMG_CDN } from "../Utils/Constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) {
    return null;
  }

  return (
    <div
      className="
        group
        relative
        flex-shrink-0
        cursor-pointer

        w-[105px]
        sm:w-[125px]
        md:w-[145px]
        lg:w-[165px]
        xl:w-[180px]

        transition-all
        duration-300
        ease-out

        hover:z-30
        hover:scale-105
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-md
          bg-zinc-900

          shadow-md
          transition-all
          duration-300

          group-hover:shadow-2xl
        "
      >
        <img
          src={IMG_CDN + posterPath}
          alt="Movie Poster"
          loading="lazy"
          className="
            block
            w-full
            object-cover

            aspect-[2/3]

            transition-transform
            duration-300
            ease-out

            group-hover:scale-105
          "
        />

        {/* HOVER GRADIENT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent

            opacity-0
            transition-opacity
            duration-300

            group-hover:opacity-100
          "
        />
      </div>
    </div>
  );
};

export default MovieCard;