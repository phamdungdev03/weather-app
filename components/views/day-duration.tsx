import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Sunrise, Sunset, Sun, Clock } from 'lucide-react';

// Mock Card components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl bg-white shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

interface DayDurationProps {
  data: {
    sys: {
      sunrise: number;
      sunset: number;
    };
  };
}

const DayDuration: React.FC<DayDurationProps> = ({ data }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  const dayLength = sunset.getTime() - sunrise.getTime();
  
  // Calculate daylight hours
  const hours = Math.floor(dayLength / (1000 * 60 * 60));
  const minutes = Math.floor((dayLength % (1000 * 60 * 60)) / (1000 * 60));

  // Create more detailed chart data for smoother curve
  const chartData = [];
  const points = 20;
  for (let i = 0; i <= points; i++) {
    const time = sunrise.getTime() + (dayLength * i) / points;
    const value = Math.sin((Math.PI * i) / points);
    chartData.push({ time, value });
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium">
            {new Date(payload[0].payload.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 opacity-50" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
              <Sun className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Daylight Hours
            </h2>
          </div>
          <p className="text-sm text-gray-600 ml-12">
            Track the day's light cycle and solar patterns
          </p>
        </div>

        <CardContent className="space-y-6">
          {/* Daylight duration badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-900">
                {hours}h {minutes}m of daylight
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="sunGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#fb923c" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(time) =>
                    new Date(time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                />
                <YAxis hide={true} domain={[0, 1.2]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="url(#strokeGradient)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#sunGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sunrise & Sunset info */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sunrise */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Sunrise className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    Sunrise
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatTime(data.sys.sunrise)}
                  </p>
                </div>
              </div>
            </div>

            {/* Sunset */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sunset className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    Sunset
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatTime(data.sys.sunset)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar showing current time */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Day Progress</span>
              <span>
                {(() => {
                  const now = Date.now();
                  const progress = ((now - sunrise.getTime()) / dayLength) * 100;
                  return Math.max(0, Math.min(100, progress)).toFixed(0);
                })()}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{
                  width: `${(() => {
                    const now = Date.now();
                    const progress = ((now - sunrise.getTime()) / dayLength) * 100;
                    return Math.max(0, Math.min(100, progress));
                  })()}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default DayDuration;