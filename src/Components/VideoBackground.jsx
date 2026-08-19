import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = forwardRef(({ movieId }, ref) => {
  const iframeRef = useRef(null);

  useMovieTrailer({ movieId });

  const trailerVideo = useSelector(
    (store) => store.movies?.trailerVideo
  );

  // ==============================
  // YOUTUBE CONTROLS
  // ==============================

  useImperativeHandle(ref, () => ({

    playVideo: () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "playVideo",
          args: [],
        }),
        "*"
      );
    },

    pauseVideo: () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: [],
        }),
        "*"
      );
    },

    stopVideo: () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "stopVideo",
          args: [],
        }),
        "*"
      );
    },

    // 🔊 SOUND ON
    unMuteVideo: () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "unMute",
          args: [],
        }),
        "*"
      );

      // volume increase
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [100],
        }),
        "*"
      );
    },

    // 🔇 SOUND OFF
    muteVideo: () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "mute",
          args: [],
        }),
        "*"
      );
    },

  }));


  // ==============================
  // STOP WHEN COMPONENT UNMOUNTS
  // ==============================

  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "stopVideo",
            args: [],
          }),
          "*"
        );

        iframeRef.current.src = "";
      }
    };
  }, []);


  // ==============================
  // LOADING
  // ==============================

  if (!trailerVideo) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <p className="text-white">
          Loading trailer...
        </p>
      </div>
    );
  }


  const trailerKey = trailerVideo.key;


  // ==============================
  // VIDEO
  // ==============================

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">

      <iframe
        ref={iframeRef}
        className="
          absolute
          left-1/2
          top-1/2
          h-[56.25vw]
          min-h-full
          w-full
          min-w-[177.78vh]
          -translate-x-1/2
          -translate-y-1/2
          scale-110
          border-0
        "
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&enablejsapi=1&loop=1&playlist=${trailerKey}&rel=0`}
        title="Movie Trailer"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />

    </div>
  );
});

export default VideoBackground;