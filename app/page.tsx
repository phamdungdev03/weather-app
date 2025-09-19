import WeatherDashboard from "@/components/views/dashboard";
import Navbar from "../components/views/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WeatherDashboard />
    </div>
  );
}
