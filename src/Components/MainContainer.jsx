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


  // ==============================
  // PLAY / PAUSE
  // ==============================

  const handlePlayPause = () => {

    if (isPlaying) {

      videoRef.current?.pauseVideo();

      setIsPlaying(false);

    } else {

      videoRef.current?.playVideo();

      setIsPlaying(true);

    }
  };


  // ==============================
  // SOUND ON / OFF
  // ==============================

  const handleMute = () => {

    if (isMuted) {

      // 🔊 SOUND ON
      videoRef.current?.unMuteVideo();

      setIsMuted(false);

    } else {

      // 🔇 SOUND OFF
      videoRef.current?.muteVideo();

      setIsMuted(true);
    }
  };


  return (
    <main className="relative w-full overflow-hidden bg-black">

      <section
        className="
          relative
          w-full
          overflow-hidden

          h-[500px]

          sm:h-[550px]

          md:h-[600px]

          lg:h-[650px]

          xl:h-[700px]

          2xl:h-[750px]
        "
      >

        {/* VIDEO */}

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


        {/* LEFT OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-gradient-to-r
            from-black/70
            via-black/20
            to-transparent
          "
        />


        {/* MOVIE TITLE */}

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