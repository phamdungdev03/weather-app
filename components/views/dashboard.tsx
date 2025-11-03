
import { WeatherData } from "@/types/weather";
import CurrentWeatherCard from "./current-weather";
import DaylyForecast from "./dayly-forecast";
import HourlyForecast from "./hourly-forecast";
import { useMemo } from "react";
import AirPollutionChart from "./air-pollution";
import TemperatureHumidityChart from "./temp-humidity";
import DayDuration from "./day-duration";
import ClientMap from "./client-map";

interface WeatherDashboardProps {
    weatherData: WeatherData;
    unit: 'metric' | 'imperial'; 
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ weatherData, unit }) => {
    const { currentWeather, forecast, airPollution } = weatherData;

    const hourlyForecastData = useMemo(() => {
        return forecast.list.slice(0, 5).map((item) => {
            const date = new Date(item.dt * 1000);
            return {
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: Math.round(item.main.temp),
            weather: item.weather[0].main,
            };
        });
    }, [forecast.list]);

    
    return (
        <div className="bg-inherit min-h-screen flex flex-col">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <CurrentWeatherCard
                    currentWeather={currentWeather}
                    forecast={forecast}
                    unit={unit}
                />

                <div className="grid grid-rows-2 gap-4">
                    <DaylyForecast />
                    <HourlyForecast forecast={hourlyForecastData} unit={unit}/>
                </div>

                <AirPollutionChart airPrllution={airPollution}/>
                <TemperatureHumidityChart data={forecast} unit={unit}/>
                <DayDuration data={currentWeather}/>
                <ClientMap
                    center={[currentWeather.coord.lat, currentWeather.coord.lon]}
                    zoom={10}
                    markerPosition={[currentWeather.coord.lat, currentWeather.coord.lon]}
                    popupContent={`${currentWeather.name}, ${currentWeather.sys.country}`}
                />
            </div>
        </div>
    )
}
 
export default WeatherDashboard;