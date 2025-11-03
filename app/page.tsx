'use client'

import WeatherDashboard from "@/components/views/dashboard";
import Navbar from "../components/views/navbar";
import { useOptimizedWeather } from "@/hooks/useOptimizedWeather";

export default function Home() {
  const unit = 'metric' as const; // unit of measurement - đơn vị đo
  const { weatherData } = useOptimizedWeather();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
       {weatherData && <WeatherDashboard weatherData={weatherData} unit={unit} />} 
    </div>
  );
}
