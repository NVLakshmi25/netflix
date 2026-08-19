import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!movies || movies.length === 0) {
    return null;
  }

  const mainMovie = movies[0];

  const {
    original_title,
    overview,
    id,
  } = mainMovie;

  // PLAY / PAUSE
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      videoRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  // MUTE / UNMUTE
  const handleMute = () => {
    if (isMuted) {
      videoRef.current?.unMuteVideo();
      setIsMuted(false);
    } else {
      videoRef.current?.muteVideo();
      setIsMuted(true);
    }
  };

  return (
    <main className="relative w-full bg-black text-white">
      {/* HERO */}
      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-black

          h-[500px]
          sm:h-[540px]
          md:h-[590px]
          lg:h-[640px]
          xl:h-[680px]
        "
      >
        {/* BACKGROUND VIDEO */}
        <VideoBackground
          ref={videoRef}
          movieId={id}
        />

        {/* DARK OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10

            bg-gradient-to-t
            from-black
            via-black/30
            to-transparent
          "
        />

        {/* LEFT CINEMATIC GRADIENT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10

            bg-gradient-to-r
            from-black/85
            via-black/35
            to-transparent
          "
        />

        {/* TOP DARK GRADIENT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-10
            h-32

            bg-gradient-to-b
            from-black/70
            to-transparent
          "
        />

        {/* BOTTOM FADE */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            z-10

            h-48

            bg-gradient-to-t
            from-black
            via-black/80
            to-transparent
          "
        />

        {/* MOVIE CONTENT */}
        <VideoTitle
          title={original_title}
          overview={overview}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayPause={handlePlayPause}
          onMute={handleMute}
        />
      </section>
    </main>
  );
};

export default MainContainer;