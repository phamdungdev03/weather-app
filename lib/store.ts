import { create } from 'zustand';
import { DEFAULT_COORDINATES } from "@/constants";
import { Coordinates, WeatherData, WeatherForecastData } from "@/types/weather";
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface WeatherState {
    // Core state: stores the user's coordinates and fetched weather data.
    coordinates: Coordinates;
    weatherData: WeatherData | null;
    weatherForecastData: WeatherForecastData | null;
    unit: 'metric' | 'imperial';

    // UI state: controls loading, error, dialogs, and selection flags.
    isLoading: boolean;
    error: string | null;
    showLocationDialog: boolean;
    isManualSelection: boolean;
    geolocationEnabled: boolean;
    hasInitialLoad: boolean;

    // Search state: manages search query, suggestions, and searching flag.
    searchQuery: string;
    citySuggestions: Array<{ name: string; country: string; lat: number; lon: number }>;
    isSearching: boolean;

    // Actions: functions to update state.
    setCoordinates: (coords: Coordinates) => void;
    setWeatherData: (data: WeatherData | null) => void;
    setForecastData: (data: any) => void; // Forecast data setter
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLocationDialog: (show: boolean) => void;
    setManualSelection: (manual: boolean) => void;
    setGeolocationEnabled: (enabled: boolean) => void;
    setInitialLoad: (loaded: boolean) => void;
    setSearchQuery: (query: string) => void;
    setCitySuggestions: (
        suggestions: Array<{ name: string; country: string; lat: number; lon: number }>,
    ) => void;
    setSearching: (searching: boolean) => void;

    // Complex actions: logic for updating location, triggering geolocation, handling permissions, and resetting state.
    updateLocation: (lat: number, lon: number) => void;
    triggerCurrentLocation: () => void;
    handleLocationPermission: (allow: boolean) => void;
    reset: () => void;
}

const initialState = {
  coordinates: DEFAULT_COORDINATES,
  weatherData: null,
  weatherForecastData: null,
  unit: 'metric' as const,
  isLoading: false,
  error: null,
  showLocationDialog: true,
  isManualSelection: false,
  geolocationEnabled: false,
  hasInitialLoad: false,
  searchQuery: '',
  citySuggestions: [],
  isSearching: false,
};


export const useWeatherStore = create<WeatherState>()(
    devtools(
        subscribeWithSelector((set, get) => ({
            ...initialState,

            // Simple setters for updating state fields.
            setCoordinates: (coords) => set({ coordinates: coords }),
            setWeatherData: (data) => set({ weatherData: data }),
            setForecastData: (forecastData) => set({ weatherForecastData: forecastData }), 
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
            setLocationDialog: (show) => set({ showLocationDialog: show }),
            setManualSelection: (manual) => set({ isManualSelection: manual }),
            setGeolocationEnabled: (enabled) => set({ geolocationEnabled: enabled }),
            setInitialLoad: (loaded) => set({ hasInitialLoad: loaded }),
            setSearchQuery: (query) => set({ searchQuery: query }),
            setCitySuggestions: (suggestions) => set({ citySuggestions: suggestions }),
            setSearching: (searching) => set({ isSearching: searching }),

            // updateLocation: updates coordinates only if they have changed, and sets manual selection.
            updateLocation: (lat, lon) => {
                const newCoords = { lat, lon };
                const current = get().coordinates;
                // Only update if coordinates actually changed (avoids unnecessary re-renders)
                if (
                Math.abs(current.lat - lat) > 0.000001 ||
                Math.abs(current.lon - lon) > 0.000001
                ) {
                set({
                    coordinates: newCoords,
                    isManualSelection: true,
                    geolocationEnabled: false,
                    hasInitialLoad: true,
                    error: null,
                });
                }
            },

            // triggerCurrentLocation: enables geolocation and resets manual selection and search state.
            triggerCurrentLocation: () => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        set({
                            showLocationDialog: false,
                            geolocationEnabled: true,
                            isManualSelection: false,
                            hasInitialLoad: true,
                            coordinates: { lat: latitude, lon: longitude },
                            error: null,
                        });;
                    },
                )
            },

            // handleLocationPermission: updates state based on user permission for geolocation.
            handleLocationPermission: (allow) => {
            if (allow) {
                navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    set({
                        showLocationDialog: false,
                        geolocationEnabled: true,
                        isManualSelection: false,
                        hasInitialLoad: true,
                        coordinates: { lat: latitude, lon: longitude },
                        error: null,
                    });
                },
                (err) => {
                    console.error("❌ Failed to get geolocation:", err);
                    set({
                        showLocationDialog: false,
                        geolocationEnabled: false,
                        isManualSelection: true,
                        hasInitialLoad: true,
                        coordinates: DEFAULT_COORDINATES,
                        error: err.message,
                    });
                }
                );
            } else {
                set({
                showLocationDialog: false,
                geolocationEnabled: false,
                isManualSelection: true,
                hasInitialLoad: true,
                coordinates: DEFAULT_COORDINATES,
                });
            }},

            // reset: resets the store to its initial state.
            reset: () => set(initialState),
        })),
        {
            name: 'weather-store', // Name for Redux DevTools
        },
    ),
)

export const useCoordinates = () => useWeatherStore((state) => state.coordinates);
export const useWeatherData = () => useWeatherStore((state) => state.weatherData);
export const useWeatherForecastData = () => useWeatherStore((state) => state.weatherForecastData);
export const useSearchQuery = () => useWeatherStore((state) => state.searchQuery);
export const useCitySuggestions = () => useWeatherStore((state) => state.citySuggestions);
export const useIsSearching = () => useWeatherStore((state) => state.isSearching);
export const useLoading = () => useWeatherStore((state) => state.isLoading);
export const useError = () => useWeatherStore((state) => state.error);