import { City, WeatherData } from '@/types/weather';
import axios, { AxiosInstance } from 'axios'
import { error } from 'console';

// API Configuration: API key and base URL for OpenWeatherMap
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_BASE_URL;

// Cache configuration: store weather and city data for 5 minutes to avoid unnecessary API calls
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const cityCache = new Map<string, { data: City[]; timestamp: number }>();

// Request deduplication: track in-flight requests to avoid duplicate network calls for the same resource
const pendingWeatherRequests = new Map<string, Promise<WeatherData>>();
const pendingCityRequests = new Map<string, Promise<City[]>>();


// Create an axios instance with common config 
const createApiInstance = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers:{
            'Content-Type': 'application/json',
        }
    })

    // Request and response interceptors for logging or error handling 
    instance.interceptors.request.use(
        (config) => config,
        (error) => Promise.reject(error),
    )

    instance.interceptors.response.use(
        (response) => response, 
        (error) => Promise.reject(error),
    )
    return instance;
}

const api = createApiInstance(); 

// Api functions handling 
export class WeatherAPI {
    private static instance: WeatherAPI;
    private api: AxiosInstance;

    private constructor(){
        this.api = api; 
    }
    
    // Ensure there is only one WeatherAPI object in the Entire program
    static getInstance(): WeatherAPI{
        if(!WeatherAPI.instance){
            WeatherAPI.instance = new WeatherAPI();
        }
        return WeatherAPI.instance;
    }

    async fetchWeatherData(
        lat: number,
        lon: number,
        signal?: AbortSignal,
    ): Promise<WeatherData> {
        const cacheKey = `weather-${lat}-${lon}`;

        // Check cache first
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }

        // Check for pending request
        if (pendingWeatherRequests.has(cacheKey)) {
            return pendingWeatherRequests.get(cacheKey)!;
        }

        // Create new request
        const request = Promise.all([
            this.api.get('/weather', {
                params: { lat, lon, units: 'metric', appid: API_KEY },
                signal,
            }),
            this.api.get('/forecast', {
                params: { lat, lon, units: 'metric', appid: API_KEY },
                signal,
            }),
            this.api.get('/air_pollution', {
                params: { lat, lon, appid: API_KEY },
                signal,
            }),
        ]).then(([currentWeather, forecast, airPollution]) => {
        const data: WeatherData = {
            currentWeather: currentWeather.data,
            forecast: forecast.data,
            airPollution: airPollution.data,
        };

        // Cache the result
        weatherCache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
        });

         // Store pending request
        pendingWeatherRequests.set(cacheKey, request);

        try {
            return await request;
        } catch (error) {
            pendingWeatherRequests.delete(cacheKey);
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): Error {
        if (error instanceof Error && error.name === 'AbortError') {
        return error;
        }

        if (axios.isAxiosError(error)) {
        const message =
            error.response?.data?.message || error.message || 'API request failed';
        return new Error(message);
        }

        return new Error('An unexpected error occurred');
    }
}