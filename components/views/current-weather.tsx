import React from 'react';
import { MapPin, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { Card } from '../ui/card';
import { Sunny } from '@/public/svgs/weather';

const CurrentWeather = () => {
    return (
        <Card>
            {/* Background decorative elements */}
            <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <div>
                            <h2 className="text-lg font-semibold">Hanoi</h2>
                            <p className="text-sm">Vietnam</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm">Today</div>
                        <div className="text-sm font-medium">Aug 04, 2024</div>
                    </div>
                </div>

                {/* Main weather display */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-5xl font-light mb-2">28°</div>
                        <div className="mb-1">Heavy Rain</div>
                        <div className="text-sm">Feels like 31°</div>
                    </div>
                    <div className="relative">
                        {/* Weather icon with glow effect */}
                        <Sunny className="w-32 h-32" />
                    </div>
                </div>

                {/* Weather details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Droplets className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-xs ">Humidity</div>
                            <div className="font-medium">82%</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Wind className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-xs ">Wind</div>
                            <div className="font-medium">12 km/h</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-xs ">Visibility</div>
                            <div className="font-medium">8.2 km</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Thermometer className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-xs ">UV Index</div>
                            <div className="font-medium">3 Low</div>
                        </div>
                    </div>
                </div>

                {/* High/Low temperature */}
                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                        <span className="">Today's High</span>
                        <span className="font-medium">28°C</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="">Today's Low</span>
                        <span className="font-medium">24°C</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CurrentWeather;