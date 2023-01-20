import { useState, useCallback } from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
      
        setLoading(loading => true);
        try{
           const response = await fetch(url, {method, body, headers});

           if(!response.ok){
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
           }

           const data = await response.json();
           setLoading(loading => false);
           return data;

        } catch(e){
            setLoading(loading => false);
            setError(e.message);
            throw e;
        }

    }, [])


    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}