import { createContext, useState, useEffect } from "react";
import useYouTubeInit from "../hooks/useYouTubeInit";
import useBackendSync from "../hooks/useBackendSync";

// Create context
export const VideosContext = createContext({
    videos: [],
    currentVideo: null,
    setCurrentVideo: () => { },
    playBackSpeed: 1,
    setPlayBackSpeed: () => { },
    currentTimeStamp: 0,
    setCurrentTimeStamp: () => { },
    loading: false,
    error: null,
    watchPercent: 0,
    setWatchPercent: () => { }
});



export const VideosProvider = ({ children }) => {
    // Subscribe to our backend
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const {data:videos,loading,error} = useBackendSync(`${API_URL}/videos`)
    // Track the current video
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Track the current playback speed
    const [playBackSpeed, setPlayBackSpeed] = useState(1);

    // Track the current video timestamp
    const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

    // Track the current watch percentage
    const [watchPercent, setWatchPercent] = useState(0);

    // Subscribe to the YouTube API
    useYouTubeInit();

    return (
        <VideosContext value={{ setWatchPercent, watchPercent, videos, currentVideoIndex, setCurrentVideoIndex, playBackSpeed, setPlayBackSpeed, currentTimeStamp, setCurrentTimeStamp, loading, error }}>
            {loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : children}
        </VideosContext>
    )
}