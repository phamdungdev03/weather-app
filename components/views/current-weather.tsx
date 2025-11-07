import React from 'react';
import { Wind, MapPin, Droplets, Eye, CloudRain, Calendar, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Rainy, Sunny, Cloudy, ClearSky } from '@/public/svgs/weather';

interface CurrentWeatherCardsProps {
  currentWeather: {
    name: string;
    sys: { country: string };
    main: {
      temp: number;
      feels_like: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    weather: Array<{ main: string }>;
    wind: { speed: number };
    visibility: number;
  };
  forecast: {
    list: Array<{ pop: number }>;
  };
  unit: 'metric' | 'imperial';
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

  const getWeatherGradient = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return 'from-amber-400/10 to-orange-400/10';
      case 'clouds':
        return 'from-gray-400/10 to-slate-400/10';
      case 'rain':
        return 'from-blue-400/10 to-cyan-400/10';
      default:
        return 'from-amber-400/10 to-orange-400/10';
    }
  };

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getWeatherGradient(currentWeather.weather[0].main)} opacity-50`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentWeather.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentWeather.sys.country}
              </p>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1.5 justify-end text-blue-600 dark:text-blue-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">Today</span>
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
            <div className="flex items-center gap-1.5 justify-end text-gray-500 dark:text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">
                {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Main weather display */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                {Math.round(currentWeather.main.temp)}°
              </span>
              <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            
            <div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {currentWeather.weather[0].main}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Feels like {Math.round(currentWeather.main.feels_like)}°
                {unit === 'metric' ? 'C' : 'F'}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 blur-3xl opacity-30 bg-current" />
            {getWeatherIcon(currentWeather.weather[0].main)}
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 transition-transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Humidity
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentWeather.main.humidity}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 transition-transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Wind Speed
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round(currentWeather.wind.speed)}{' '}
                  <span className="text-sm font-normal">
                    {unit === 'metric' ? 'km/h' : 'mph'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 transition-transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Visibility
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round(currentWeather.visibility / 1000)}{' '}
                  <span className="text-sm font-normal">km</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 transition-transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-800/50 rounded-lg">
                <CloudRain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Rain Chance
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round(forecast.list[0].pop * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High/Low temperature */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Today's High
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-red-500 dark:text-red-400">
                {(currentWeather.main.temp_max)}°
              </span>
              <span className="text-sm text-gray-500">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
          </div>
          
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Today's Low
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-500 dark:text-blue-400">
                {(currentWeather.main.temp_min)}°
              </span>
              <span className="text-sm text-gray-500">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeatherCard;