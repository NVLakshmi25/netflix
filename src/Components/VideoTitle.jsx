import React from "react";

const VideoTitle = ({
  title,
  overview,
  isPlaying,
  isMuted,
  onPlayPause,
  onMute,
}) => {

  return (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        items-center
        justify-center
        px-4
        pt-16
        text-center

        lg:justify-start
        lg:text-left
        lg:px-12

        xl:px-16
      "
    >

      <div
        className="
          w-full
          max-w-md

          sm:max-w-lg

          md:max-w-xl

          lg:max-w-2xl
        "
      >

        {/* TITLE */}

        <h1
          className="
            line-clamp-2
            text-3xl
            font-extrabold
            leading-tight
            text-white
            drop-shadow-2xl

            sm:text-4xl

            md:text-5xl

            xl:text-6xl
          "
        >
          {title}
        </h1>


        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-3
            line-clamp-3
            max-w-lg
            text-sm
            leading-relaxed
            text-gray-200

            sm:text-base

            md:text-lg

            lg:mx-0
          "
        >
          {overview}
        </p>


        {/* BUTTONS */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            justify-center
            gap-3

            lg:justify-start
          "
        >

          {/* PLAY / PAUSE */}

          <button
            onClick={onPlayPause}
            className="
              rounded
              bg-white
              px-5
              py-2.5
              font-bold
              text-black
              hover:bg-gray-300
            "
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>


          {/* SOUND */}

          <button
            onClick={onMute}
            className="
              rounded
              bg-gray-700/80
              px-5
              py-2.5
              font-bold
              text-white
              hover:bg-gray-600
            "
          >
            {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
          </button>


          {/* MORE INFO */}

          <button
            className="
              rounded
              bg-gray-600/80
              px-5
              py-2.5
              font-bold
              text-white
              hover:bg-gray-500
            "
          >
            ⓘ More Info
          </button>

        </div>

      </div>

    </div>
  );
};

export default VideoTitle;