import { useContext, useRef, useEffect } from "react";
import { VideosContext } from "../../store/VideosContext";
import { useState } from "react";
import useYouTubePlayer from "../../hooks/useYouTubePlayer";
import useVideoProgress from "../../hooks/useVideoProgress";
import useLoadNextVideo from "../../hooks/useLoadNextVideo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moveToNextVideo } from "../../store/playlist";
import { setWatchPercent } from "../../store/video";
import { PlayArrow, Pause, Replay, Speed } from "@mui/icons-material";

export default function YouTubePlayer() {
  const videos = useSelector(state => state.playlists.videos)
  const currentVideoIndex = useSelector(state => state.playlists.currentVideoIndex)
  const dispatch = useDispatch();

  const onVideoEnd = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      dispatch(moveToNextVideo())
    }
  };

  const videoId = videos[currentVideoIndex].youtubeUrl.split("/").pop();
  const { playerRef, containerRef, playerReady } = useYouTubePlayer(
    videoId,
    onVideoEnd,
  );

  useVideoProgress(videoId, playerReady, playerRef, (elapsed, total) =>
    dispatch(setWatchPercent((Number(elapsed) / Number(total)) * 100))
  );

  useLoadNextVideo(playerRef, playerReady, videoId);

  const play = () => {
    playerRef.current.playVideo();
  };
  const pause = () => playerRef.current.pauseVideo();
  const restart = () => playerRef.current.seekTo(0);
  const speedUp = () => {
    const currentSpeed = playerRef.current.getPlaybackRate();
    playerRef.current.setPlaybackRate(currentSpeed + 0.25);
  };

  return (
    <div>
      <div ref={containerRef} className="video-player-container"></div>
      {playerReady && (
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button onClick={play} className="primary" style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <PlayArrow style={{ fontSize: '20px' }} />
            Play
          </button>
          <button onClick={pause} style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <Pause style={{ fontSize: '20px' }} />
            Pause
          </button>
          <button onClick={restart} style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <Replay style={{ fontSize: '20px' }} />
            Restart
          </button>
          <button onClick={speedUp} style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <Speed style={{ fontSize: '20px' }} />
            Speed Up
          </button>
        </div>
      )}
    </div>
  );
}
