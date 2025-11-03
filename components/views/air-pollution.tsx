'use client'

import { AirPollutionResponse } from "@/types/weather";
import React from "react";
import { ChartConfig, ChartContainer, ChartTooltip } from "../ui/chart";
import { Card } from "../ui/card";
import { ResponsiveContainer, PieChart, Label, Pie } from "recharts";
import { Cloudy } from "lucide-react";

interface AirPollutionChartProps {
    airPrllution: AirPollutionResponse; 
}

const chartConfig = {
  co: {
    label: 'CO',
    color: 'var(--color-chart-1)',
  },
  no2: {
    label: 'NO₂',
    color: 'var(--color-chart-2)',
  },
  o3: {
    label: 'O₃',
    color: 'var(--color-chart-3)',
  },
  pm25: {
    label: 'PM2.5',
    color: 'var(--color-chart-4)',
  },
  pm10: {
    label: 'PM10',
    color: 'var(--color-chart-5)',
  },
  so2: {
    label: 'SO₂',
    color: 'var(--color-chart-6)',
  },
} satisfies ChartConfig;

const getAQIDescription = (aqi: number) => {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Fair';
    case 3:
      return 'Moderate';
    case 4:
      return 'Poor';
    case 5:
      return 'Very Poor';
    default:
      return 'Unknown';
  }
};

const AirPollutionChart: React.FC<AirPollutionChartProps> = ({airPrllution}) => {
  
    const latestData = airPrllution.list[0];
    const { components } = latestData;

    const chartData = [
        { name: 'co', pollutant: 'CO', value: components.co, fill: 'var(--color-chart-1)' },
        {
          name: 'no2',
          pollutant: 'NO₂',
          value: components.no2,
          fill: 'var(--color-chart-2)',
        },
        { name: 'o3', pollutant: 'O₃', value: components.o3, fill: 'var(--color-chart-3)' },
        {
          name: 'pm25',
          pollutant: 'PM2.5',
          value: components.pm2_5,
          fill: 'var(--color-chart-4)',
        },
        {
          name: 'pm10',
          pollutant: 'PM10',
          value: components.pm10,
          fill: 'var(--color-chart-5)',
        },
        {
          name: 'so2',
          pollutant: 'SO₂',
          value: components.so2,
          fill: 'var(--color-chart-6)',
        },
    ];

    return (
        <Card className="flex flex-col">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <div className="p-2">
                  <Cloudy className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Air Pollution
              </h2>
            </div>
            <span>Air Quality Index (AQI): {getAQIDescription(latestData.main.aqi)}</span>
          </div>

          <div>
            <ChartContainer config={chartConfig} >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (!active || !payload) return null;
                      const data = payload[0]?.payload;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: data.fill }}
                              />
                              <span className="text-sm font-medium">{data.pollutant}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {data.value.toFixed(2)} μg/m³
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="50%"
                  outerRadius="78%"
                  strokeWidth={6}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {latestData.main.aqi}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              AQI
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 justify-center">
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-muted-foreground text-xs">
                    {item.pollutant}: {item.value.toFixed(2)} μg/m³
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
    )
}

export default AirPollutionChart;