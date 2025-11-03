import React from 'react';
import { Card } from '../ui/card';
import { Wind, MapPin, Droplets, Thermometer, Eye, Cloudy, CloudRain } from 'lucide-react';
import { CurrentWeatherResponse, ForecastResponse } from '@/types/weather';
import { ClearSky, Rainy, Sunny } from '@/public/svgs/weather';

interface CurrentWeatherCardsProps {
    currentWeather: CurrentWeatherResponse;
    forecast: ForecastResponse; 
    unit: "metric" | 'imperial' 
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardsProps> = ({
    currentWeather,
    forecast,
    unit,
}) => {
    const getWeatherIcon = (main: string) => {
        switch (main.toLowerCase()) {
        case 'clear':
            return (
            <Sunny className="w-32 h-32 text-yellow-500 transition-transform hover:scale-105" />
            );
        case 'clouds':
            return (
            <Cloudy className="w-32 h-32 text-gray-500 transition-transform hover:scale-105" />
            );
        case 'rain':
            return (
            <Rainy className="w-32 h-32 text-blue-500 transition-transform hover:scale-105" />
            );
        default:
            return (
            <ClearSky className="w-32 h-32 text-yellow-400 transition-transform hover:scale-105" />
            );
        }
    };

    return (
        <Card className='p-6'>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <div>
                        <h2 className="text-lg font-semibold">{currentWeather.name}</h2>
                        <p className="text-sm">{currentWeather.sys.country}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold">Today</div>
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {new Date().toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            </div>

            {/* Main weather display */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className='flex items-end'>
                        <p className="text-6xl font-bold tracking-tighter">
                            {Math.round(currentWeather.main.temp)}°
                        </p>
                        <p className="text-2xl font-bold ml-1">
                            {unit === 'metric' ? 'C' : 'F'}
                        </p>
                    </div>
                    <p className="text-xl font-semibold text-muted-foreground">
                        {currentWeather.weather[0].main}
                    </p>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Feels like {Math.round(currentWeather.main.feels_like)}°
                        {unit === 'metric' ? 'C' : 'F'}
                    </p>
                </div>
                <div className="relative">
                    {/* Weather icon with glow effect */}
                    {getWeatherIcon(currentWeather.weather[0].main.toLowerCase())}
                </div>
            </div>

            {/* Weather details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Droplets className="w-5 h-5 mr-2 flex-shrink-0 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-xs ">Humidity</div>
                        <span className="text-xs sm:text-sm text-nowrap">
                            {currentWeather.main.humidity}%
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Wind className="w-5 h-5 mr-2 flex-shrink-0 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs ">Wind Speed</div>
                        <span className="text-xs sm:text-sm text-nowrap">
                            {Math.round(currentWeather.wind.speed)}{' '}
                            {unit === 'metric' ? 'km/h' : 'mph'}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Eye className="w-5 h-5 mr-2 flex-shrink-0 text-red-400" />
                    </div>
                    <div>
                        <div className="text-xs">Visibility</div>
                            <span className="text-xs sm:text-sm text-nowrap">
                            {Math.round(currentWeather.visibility / 1000)} km
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <CloudRain className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
                    </div>
                        <div>
                        <div className="text-xs">Rain Chance</div>
                            <span className="text-xs sm:text-sm text-nowrap">
                            {Math.round(forecast.list[0].pop * 100)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* High/Low temperature */}
            <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-sm">
                    <span className="">Today's High</span>
                    <span className="font-medium">{currentWeather.main.temp_max}° {unit === 'metric' ? 'C' : 'F'}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                    <span className="">Today's Low</span>
                    <span className="font-medium">{currentWeather.main.temp_min}° {unit === 'metric' ? 'C' : 'F'}</span>
                </div>
            </div>
        </Card>
    );
};

export default CurrentWeatherCard;