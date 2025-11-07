import React from 'react';
import { Sun, Cloud, CloudRain, CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/card';

const DailyForecast = () => {
  const forecasts = [
    { day: "Mon", date: "12", high: 28, low: 24, condition: "Sunny", icon: Sun, color: "amber" },
    { day: "Tue", date: "13", high: 26, low: 22, condition: "Cloudy", icon: Cloud, color: "gray" },
    { day: "Wed", date: "14", high: 24, low: 20, condition: "Rainy", icon: CloudRain, color: "blue" },
    { day: "Thu", date: "15", high: 27, low: 23, condition: "Sunny", icon: Sun, color: "amber" },
    { day: "Fri", date: "16", high: 29, low: 25, condition: "Sunny", icon: Sun, color: "amber" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      amber: {
        bg: 'from-amber-400 to-orange-500',
        icon: 'text-amber-500 dark:text-amber-400',
        cardBg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
        border: 'border-amber-200 dark:border-amber-800',
      },
      gray: {
        bg: 'from-gray-400 to-slate-500',
        icon: 'text-gray-500 dark:text-gray-400',
        cardBg: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
        border: 'border-gray-200 dark:border-gray-700',
      },
      blue: {
        bg: 'from-blue-400 to-cyan-500',
        icon: 'text-blue-500 dark:text-blue-400',
        cardBg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
        border: 'border-blue-200 dark:border-blue-800',
      },
    };
    return colors[color as keyof typeof colors] || colors.amber;
  };

  return (
    <Card className="flex flex-col gap-6 px-6 py-0">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl -z-0" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center pb-2">
            <div className="p-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Daily Forecast
            </h2>
        </div>

        {/* Forecast Grid */}
        <div className="grid grid-cols-5 gap-3">
          {forecasts.map((forecast, index) => {
            const IconComponent = forecast.icon;
            const colors = getColorClasses(forecast.color);
            
            return (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${colors.cardBg} rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer`}
              >
                {/* Day & Date */}
                <div className="text-center mb-3">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {forecast.day}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {forecast.date}
                  </p>
                </div>

                {/* Weather Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`p-3 bg-gradient-to-br ${colors.bg} rounded-full shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Condition */}
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium mb-3">
                  {forecast.condition}
                </p>

                {/* Temperature */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      {forecast.high}°
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {forecast.low}°
                    </span>
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

export default DailyForecast;