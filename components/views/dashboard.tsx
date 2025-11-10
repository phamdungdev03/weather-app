
import { WeatherData, WeatherForecastData } from "@/types/weather";
import CurrentWeatherCard from "./current-weather";
import DaylyForecast from "./dayly-forecast";
import HourlyForecast from "./hourly-forecast";
import { useMemo } from "react";
import AirPollutionChart from "./air-pollution";
import TemperatureHumidityChart from "./temp-humidity";
import DayDuration from "./day-duration";
import ClientMap from "./client-map";
import { Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherDashboardProps {
    weatherData: WeatherData;
    weatherForeCastData: WeatherForecastData;
    unit: 'metric' | 'imperial'; 
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ weatherData, weatherForeCastData, unit }) => {
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

    // Convert API forecast data to a more usable format
    const mapApiToForecast = (list: any[]) => {
        const grouped: Record<string, any[]> = {};

        // Group by date
        list.forEach(item => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // '2025-11-10'
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
        });

        // Get the first 5 days
        return Object.keys(grouped).slice(0, 5).map(date => {
            const dayList = grouped[date];
            const dateObj = new Date(dayList[0].dt * 1000);
            const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

            // Calculate high and low temperatures
            const high = Math.round(Math.max(...dayList.map(d => d.main.temp_max)));
            const low = Math.round(Math.min(...dayList.map(d => d.main.temp_min)));

            // Chọn điều kiện chính (lấy của bản tin buổi trưa nếu có)
            const noon = dayList[Math.floor(dayList.length / 2)];
            let icon = Sun;
            let color: 'amber' | 'gray' | 'blue' = 'amber';
            if (noon.weather[0].main === 'Clouds') {
                icon = Cloud; color = 'gray';
            } else if (noon.weather[0].main === 'Rain') {
                icon = CloudRain; color = 'blue';
            }

            return {
                day,
                date: dateObj.getDate().toString(),
                high,
                low,
                condition: noon.weather[0].main,
                icon,
                color,
            };
        });
    };

    const forecasts = mapApiToForecast(weatherForeCastData.forecast.list);

    return (
        <div className="bg-inherit min-h-screen flex flex-col">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%_40%_auto] gap-4 p-4">
                <CurrentWeatherCard
                    currentWeather={currentWeather}
                    forecast={forecast}
                    unit={unit}
                />

                <div className="grid grid-rows-2 gap-4">
                    <DaylyForecast forecasts={forecasts}/>
                    <HourlyForecast forecast={hourlyForecastData} unit={unit}/>
                </div>

                <DayDuration data={currentWeather}/>
                <TemperatureHumidityChart data={forecast} unit={unit}/>
                <AirPollutionChart airPrllution={airPollution}/>
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