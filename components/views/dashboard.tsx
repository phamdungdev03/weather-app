import CurrentWeather from "./current-weather";

const WeatherDashboard = () => {
    return (
        <div className="bg-inherit min-h-screen flex flex-col">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <CurrentWeather />
            </div>
        </div>
    )
}

export default WeatherDashboard;