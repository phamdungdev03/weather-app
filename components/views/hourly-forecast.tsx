import React, { useCallback, useMemo } from 'react';
import { Clock, CloudSnow, Cloudy, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';

// Mock weather SVG components
const Sunny = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <circle cx="50" cy="50" r="15" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1={50 + Math.cos((angle * Math.PI) / 180) * 25}
        y1={50 + Math.sin((angle * Math.PI) / 180) * 25}
        x2={50 + Math.cos((angle * Math.PI) / 180) * 35}
        y2={50 + Math.sin((angle * Math.PI) / 180) * 35}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const ClearSky = Sunny;

const Rainy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M25,40 Q25,25 35,25 Q35,15 45,15 Q50,10 55,15 Q65,15 65,25 Q75,25 75,40 Q75,50 65,50 L35,50 Q25,50 25,40" />
    <line x1="35" y1="60" x2="30" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="60" x2="45" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="65" y1="60" x2="60" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface HourlyForecast {
  time: string;
  temperature: number;
  weather: string;
}

interface HourlyForecastProps {
  forecast: HourlyForecast[];
  unit: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, unit }) => {
  const getWeatherIcon = useCallback((weather: string) => {
    const iconClass = "w-12 h-12 transition-all duration-300 group-hover:scale-110";
    switch (weather.toLowerCase()) {
      case 'clear':
        return <Sunny className={`${iconClass} text-amber-400`} />;
      case 'clouds':
        return <Cloudy className={`${iconClass} text-gray-400`} />;
      case 'rain':
        return <Rainy className={`${iconClass} text-blue-400`} />;
      case 'snow':
        return <CloudSnow className={`${iconClass} text-blue-200`} />;
      default:
        return <ClearSky className={`${iconClass} text-amber-400`} />;
    }
  }, []);

  const getWeatherGradient = useCallback((weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20';
      case 'clouds':
        return 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20';
      case 'rain':
        return 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20';
      case 'snow':
        return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20';
      default:
        return 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20';
    }
  }, []);

  const memoizedForecast = useMemo(() => forecast.slice(0, 5), [forecast]);

  // Find min and max temperatures for the range indicator
  const tempRange = useMemo(() => {
    const temps = memoizedForecast.map(h => h.temperature);
    return { min: Math.min(...temps), max: Math.max(...temps) };
  }, [memoizedForecast]);

  return (
    <Card className="flex px-6 py-0">
      <div className="mt-3">
        {/* Header */}
        <div className="flex items-center justify-center mb-2">
            <div className="p-2">
                <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Hourly Forecast
            </h2>
        </div>

        {/* Forecast Cards */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {memoizedForecast.map((hour, index) => {
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${getWeatherGradient(hour.weather)} rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
              >

                {/* Time */}
                <div className="text-center mb-3">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {hour.time}
                  </p>
                </div>

                {/* Weather Icon */}
                <div className="flex justify-center mb-3">
                  {getWeatherIcon(hour.weather)}
                </div>

                {/* Weather Condition */}
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium mb-3 capitalize">
                  {hour.weather}
                </p>

                {/* Temperature */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(hour.temperature)}°
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default HourlyForecast;