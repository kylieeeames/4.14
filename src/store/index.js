import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui"
import playlistReducer from "./playlist"
import videoReducer from "./video"
export default configureStore({
    reducer:{
     ui: uiReducer,
     playlists:playlistReducer,
     video:videoReducer,
    }
})