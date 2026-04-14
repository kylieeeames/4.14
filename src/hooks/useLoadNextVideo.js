import { useEffect } from "react";

const useLoadNextVideo = (playerRef,playerReady,videoId)=>{
  useEffect(() => {
    playerRef.current && playerReady
      ? playerRef.current.loadVideoById(videoId)
      : null;
  }, [videoId,playerReady,playerRef]);
}

export default useLoadNextVideo