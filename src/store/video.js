import { createSlice } from "@reduxjs/toolkit"


const videoSlice = createSlice({
initialState:{
    playbackSpeed:1,
    currentTimeStamp:0,
    watchPercent:0
},
name:"video",
reducers:{
    setWatchPercent:(state,action)=>{
        state.watchPercent = action.payload;
    },
}
})

export const {setWatchPercent} = videoSlice.actions

export default videoSlice.reducer