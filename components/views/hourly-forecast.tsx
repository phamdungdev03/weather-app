import React, { useCallback, useMemo } from 'react';
import { Clock, CloudSnow, Cloudy } from 'lucide-react';
import { ClearSky, Rainy, Sunny } from '@/public/svgs/weather';
import { Card } from '../ui/card';

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
        const iconClass = "w-10 h-10 transition-transform hover:scale-110 duration-300";
        switch (weather.toLowerCase()) {
            case 'clear':
                return <Sunny className={`${iconClass} text-yellow-400`} />;
            case 'clouds':
                return <Cloudy className={`${iconClass} text-gray-400`} />;
            case 'rain':
                return <Rainy className={`${iconClass} text-blue-400`} />;
            case 'snow':
                return <CloudSnow className={`${iconClass} text-blue-200`} />;
            default:
                return <ClearSky className={`${iconClass} text-yellow-400`} />;
        }
    }, []);

    const memoizedForecast = useMemo(() => forecast.slice(0, 5), [forecast]);

    return (
        <Card className="flex flex-col gap-6 px-6">
            <div className="flex items-center justify-center">
                <div className="p-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Hourly Forecast
                </h2>
            </div>

            <div className="flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto">
                    <div className="grid grid-cols-5 gap-4">
                        {memoizedForecast.map((hour, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center gap-3 rounded-xl`}
                            >
                                <div className="flex justify-center">{getWeatherIcon(hour.weather)}</div>
                                <p className="text-sm font-semibold">
                                    {Math.round(hour.temperature)}°{unit === 'metric' ? 'C' : 'F'}
                                </p>
                                <p className="text-sm font-medium text-muted-foreground">{hour.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HourlyForecast;