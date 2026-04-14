import { createSlice } from "@reduxjs/toolkit"


const uiSlice = createSlice({
initialState:{
    loading:true,
    error:null,
},
name:"ui",
reducers:{
    setLoading:(state,action)=>{
        state.loading = action.payload
    },
    setError:(state,action)=>{
        state.error = action.payload;
    }
}
})

export const {setLoading,setError} = uiSlice.actions;

export default uiSlice.reducer;