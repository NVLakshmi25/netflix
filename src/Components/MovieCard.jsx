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
        flex-shrink-0
        cursor-pointer

        w-[110px]

        sm:w-[130px]

        md:w-[150px]

        lg:w-[170px]

        xl:w-[190px]
      "
    >

      <div
        className="
          overflow-hidden
          rounded-md
          bg-gray-900

          shadow-lg

          transition-all
          duration-300
          ease-in-out

          group-hover:scale-105
          group-hover:z-20

          md:group-hover:scale-110
        "
      >

        <img
          src={IMG_CDN + posterPath}
          alt="Movie Poster"

          loading="lazy"

          className="
            h-[165px]
            w-full
            object-cover

            sm:h-[195px]

            md:h-[225px]

            lg:h-[255px]

            xl:h-[285px]

            transition-transform
            duration-300
          "
        />

      </div>

    </div>

  );
};


export default MovieCard;