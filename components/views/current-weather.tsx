import React from 'react';
import { Card } from '../ui/card';
import { Sunny } from '@/public/svgs/weather';


const CurrentWeather = () => {
    return (
        <Card>
            <div className="py-6 px-6">
                {/* Header */}
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            📍 Hanoi, VN
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">°C</div>
                    </div>
                </div>

                {/* Weather Icon and Date */}
                <div className="my-8 flex flex-col items-center text-center relative z-10">
                        <Sunny className="w-32 h-32" />
                    <h3 className="text-lg font-medium text-gray-700">Today, 14 April</h3>
                </div>

                {/* Temperature */}
                <div className="relative z-10 text-center">
                    <div className="relative inline-block">
                        <h1 className="text-7xl font-bold">
                            34°
                        </h1>
                    </div>
           
                    
                    {/* Additional weather info */}
                    <div className="mt-6 flex justify-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl mb-1">💨</div>
                            <div className="text-xs text-gray-500">Wind</div>
                            <div className="text-sm font-medium">12 km/h</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">💧</div>
                            <div className="text-xs text-gray-500">Humidity</div>
                            <div className="text-sm font-medium">65%</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">👁️</div>
                            <div className="text-xs text-gray-500">Visibility</div>
                            <div className="text-sm font-medium">10 km</div>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    );
};

export default CurrentWeather;