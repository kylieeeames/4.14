import { useState } from "react";
import { useEffect } from "react";

const useBackendSync = (url)=>{
const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {data,loading,error}
}

export default useBackendSync