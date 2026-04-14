import { overwritePlaylist } from "./playlist";
import { setLoading,setError } from "./ui"

export function initializeData(url){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const fetchedData = await response.json();
                dispatch(overwritePlaylist(fetchedData))
            } catch (error) {
                dispatch(setError(error));
            } finally {
                dispatch(setLoading(false));
            }
        };
       await fetchData();
    }
}