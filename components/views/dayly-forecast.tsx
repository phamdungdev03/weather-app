import { Card } from "../ui/card";
import { Sun, Cloud, CloudRain, CalendarDays } from "lucide-react";

const DailyForecast = () => {
    const forecasts = [
        { day: "Mon", high: 28, low: 24, condition: "Sunny", icon: Sun },
        { day: "Tue", high: 26, low: 22, condition: "Cloudy", icon: Cloud },
        { day: "Wed", high: 24, low: 20, condition: "Rainy", icon: CloudRain },
        { day: "Thu", high: 27, low: 23, condition: "Sunny", icon: Sun },
        { day: "Fri", high: 29, low: 25, condition: "Sunny", icon: Sun },
    ];

    return (
        <Card className="flex flex-col gap-6 px-6">
            <div className="flex items-center justify-center">
                <div className="p-2">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Daily Forecast
                </h2>
            </div>
            <div className="grid grid-cols-5 gap-3 flex-1">
                {forecasts.map((forecast, index) => {
                    const IconComponent = forecast.icon;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center"
                        >
                            <p className="font-semibold text-gray-800">{forecast.day}</p>
                            <IconComponent className="w-10 h-10 text-yellow-500 mb-2" />
                            <div className="text-center">
                                <span className="font-bold text-gray-800 text-lg">
                                    {forecast.high}°
                                </span>
                                <span className="text-gray-500 text-sm ml-1">
                                    {forecast.low}°
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default DailyForecast;