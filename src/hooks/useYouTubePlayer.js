import { useRef, useEffect, useState } from "react";

const useYouTubePlayer = (videoId, onStateChange = (event) => {}) => {
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef();
  const containerRef = useRef();
  const videoIdRef = useRef(videoId);
  const onStateChangeRef = useRef(onStateChange);
  
  useEffect(() => {
    function createPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId:videoIdRef.current,
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: onStateChangeRef.current,
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => playerRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (playerRef.current && playerReady) {
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId, playerReady]);
  return { playerRef, containerRef, playerReady };
};

export default useYouTubePlayer;
