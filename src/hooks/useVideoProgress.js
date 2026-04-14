import { useEffect } from "react";

const useVideoProgress = (videoId,playerReady,playerRef,onProgressUpdate=(elapsed,total)=>{})=>{
  useEffect(() => {
    let timer;
    if (playerRef.current && playerRef.current.getDuration && playerReady) {
      timer = setInterval(() => {
        const total = playerRef.current.getDuration()
          ? playerRef.current.getDuration().toFixed(2)
          : 100;
        const elapsed = playerRef.current.getCurrentTime()
          ? playerRef.current.getCurrentTime().toFixed(2)
          : 0;
          onProgressUpdate(elapsed,total);
      }, 7);
    }
    return () => clearInterval(timer);
  }, [videoId, playerReady,onProgressUpdate,playerRef]);
}

export default useVideoProgress