import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  initialState: {
    videos: [],
    currentVideoIndex: 0,
  },
  name: "playlists",
  reducers: {
    setCurrentVideoIndex:(state,action)=>{
        state.currentVideoIndex = action.payload;
    },
    moveToNextVideo:(state)=>{
        state.currentVideoIndex = (state.currentVideoIndex + 1) % state.videos.length;
    },
    overwritePlaylist:(state,action)=>{
      state.videos = action.payload
    }
  },
});

export const {moveToNextVideo,setCurrentVideoIndex,overwritePlaylist} = playlistSlice.actions;

export default playlistSlice.reducer;
