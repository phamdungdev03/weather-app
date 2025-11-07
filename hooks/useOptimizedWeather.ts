import { weatherAPI } from "@/lib/api"
import { useCoordinates, useError, useLoading, useWeatherData, useWeatherStore } from "@/lib/store";
import React, { useCallback, useEffect, useRef } from "react";
import { useGeolocation } from "./useGeolocation";

export const useOptimizedWeather = () => {
    const weatherData = useWeatherData();
    const coordinates = useCoordinates();
    const { setWeatherData } = useWeatherStore();
    const isLoading = useLoading()
    const error = useError()
    const abortControllerRef = useRef<AbortController | null>(null);

    const geolocation = useGeolocation({
        timeout: 5000,
        enabled: useWeatherStore.getState().geolocationEnabled,
    });

    const { setError } = useWeatherStore();

    const fetchWeatherData = useCallback(
        async (coords: {lat: number; lon: number }) => {
            try{
                abortControllerRef.current = new AbortController();
        
                const data = await weatherAPI.fetchWeatherData(
                    coords.lat, 
                    coords.lon, 
                    abortControllerRef.current.signal,
                );
                
                setWeatherData(data);
                
            }catch(err){
                console.error(err);
                setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
                setWeatherData(null);
            }
        },
        [setWeatherData, setError]
    ) 

    const useDebouncedCoordinates = (
        coordinates: { lat: number; lon: number },
        delay: number,
        ) => {
        const [debouncedCoords, setDebouncedCoords] = React.useState(coordinates);
        const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

        React.useEffect(() => {
            if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
            setDebouncedCoords(coordinates);
            }, delay);

            return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            };
        }, [coordinates, delay]);

        return debouncedCoords;
    };

    const debouncedCoordinates = useDebouncedCoordinates(coordinates, 300);

    useEffect(() => {
        fetchWeatherData(debouncedCoordinates);
    }, [fetchWeatherData, debouncedCoordinates]);

    return {
        weatherData,
        isLoading: isLoading || geolocation.loading,
        error: error || geolocation.error,
        refetch: () => fetchWeatherData(coordinates),
    }
}