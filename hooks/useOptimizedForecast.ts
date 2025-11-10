import React, { useCallback, useEffect, useRef } from "react";
import { weatherAPI } from "@/lib/api";
import { useCoordinates, useError, useLoading, useWeatherData, useWeatherStore } from "@/lib/store";
import { WeatherForecastData } from "@/types/weather";

export const useOptimizedForecast = () => {
    const coordinates = useCoordinates();
    const { setForecastData } = useWeatherStore();
    const weatherForecastData = useWeatherData(); 
    const isLoading = useLoading();
    const error = useError();
    const abortControllerRef = useRef<AbortController | null>(null);
    const { setError } = useWeatherStore();

    // Fetch 5-day / 3-hour forecast
    const fetchForecast = useCallback(
        async (coords: { lat: number; lon: number }) => {
        try {
            abortControllerRef.current = new AbortController();

            const data: WeatherForecastData = await weatherAPI.fetch5DayForecast(
            coords.lat,
            coords.lon,
            abortControllerRef.current.signal,
            );

            setForecastData(data);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Failed to fetch forecast data");
            setForecastData(null);
        }
        },
        [setForecastData, setError]
    );

    // Debounce coordinates to prevent excessive API calls
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
        fetchForecast(debouncedCoordinates);
    }, [fetchForecast, debouncedCoordinates]);

    return {
        weatherForecastData,
        isLoading: isLoading,
        error: error,
        refetch: () => fetchForecast(coordinates),
    };
};
