export interface Coordinates {
  lat: number; // Latitude - vĩ độ
  lon: number; // Longitude - kinh độ
}

export interface WeatherCondition {
  id: number; // Weather condition ID - ID điều kiện thời tiết
  main: string; // Group of weather parameters (Rain, Snow, Extreme etc.) - nhóm các tham số thời tiết (Mưa, Tuyết, Cực đoan, v.v.)
  description: string; // Weather condition within the group - điều kiện thời tiết trong nhóm
  icon: string; // Weather icon ID - ID biểu tượng thời tiết
}

export interface MainWeatherData {
  temp: number; // Temperature - nhiệt độ
  feels_like: number; // Feels like temperature - nhiệt độ cảm giác
  temp_min: number; // Minimum temperature - nhiệt độ thấp nhất
  temp_max: number; // Maximum temperature - nhiệt độ cao nhất
  pressure: number; // Atmospheric pressure - áp suất khí quyển
  humidity: number; // Humidity percentage - độ ẩm
  sea_level?: number; // Sea level atmospheric pressure - áp suất khí quyển ở mực nước biển
  grnd_level?: number; // Ground level atmospheric pressure - áp suất khí quyển ở mặt đất
}

export interface Wind {
  speed: number; // Wind speed - tốc độ gió
  deg: number; // Wind direction in degrees - hướng gió tính bằng độ
  gust?: number; // Wind gust speed - tốc độ gió giật
}

export interface Clouds {
  all: number;
}

export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

export interface Sys {
  type?: number; 
  id?: number; 
  country: string; // Country code - mã quốc gia
  sunrise: number; // Sunrise time - thời gian mặt trời mọc
  sunset: number; // Sunset time - thời gian mặt trời lặn
}

export interface ForecastItem {
  dt: number; // Time of data forecasted, Unix, UTC - thời gian dự báo dữ liệu, Unix, UTC
  main: MainWeatherData; // Main weather data - dữ liệu thời tiết chính
  weather: WeatherCondition[]; // Weather conditions - điều kiện thời tiết
  clouds: Clouds; // Cloudiness - độ nhiều mây 
  wind: Wind; // Wind information - thông tin gió
  visibility: number; // Visibility in meters - tầm nhìn tính bằng mét
  pop: number; // Probability of precipitation - xác suất có mưa
  rain?: Rain; // Rain information (if available) - thông tin mưa (nếu có)
  snow?: Snow; // Snow information (if available) - thông tin tuyết (nếu có)
  sys: { 
    pod: string; // Part of the day (n - night, d - day) - phần của ngày (n - đêm, d - ngày)
  };
  dt_txt: string; // Date and time in UTC - ngày và giờ theo UTC
}

export interface AirPollutionData {
  dt: number; // Time of data calculation in Unix UTC - thời gian tính toán dữ liệu theo Unix UTC
  main: { 
    aqi: number; // Air Quality Index (1-5) - Chỉ số chất lượng không khí (1-5)
  };
  components: {
    co: number; // Carbon monoxide concentration - nồng độ carbon monoxide
    no: number; // Nitrogen monoxide concentration - nồng độ nitrogen monoxide
    no2: number; // Nitrogen dioxide concentration - nồng độ nitrogen dioxide
    o3: number; // Ozone concentration - nồng độ ozone
    so2: number; // Sulphur dioxide concentration - nồng độ sulphur dioxide
    pm2_5: number; // Fine particulate matter concentration - nồng độ bụi mịn
    pm10: number; // Coarse particulate matter concentration - nồng độ bụi thô
    nh3: number; // Ammonia concentration - nồng độ ammonia
  };
}

export interface CurrentWeatherResponse {
  coord: Coordinates; // Coordinates of the location - tọa độ của vị trí
  weather: WeatherCondition[]; // Weather conditions - điều kiện thời tiết
  base: string; // Internal parameter - tham số nội bộ
  main: MainWeatherData; // Main weather data - dữ liệu thời tiết chính
  visibility: number; // Visibility in meters - tầm nhìn tính bằng mét
  wind: Wind; // Wind information - thông tin gió
  clouds: Clouds; // Cloudiness - độ nhiều mây
  rain?: Rain; // Rain information (if available) - thông tin mưa (nếu có)
  snow?: Snow; // Snow information (if available) - thông tin tuyết (nếu có)
  dt: number; // Data calculation time in Unix UTC - thời gian tính toán dữ liệu theo Unix UTC
  sys: Sys; // System data - dữ liệu hệ thống
  timezone: number; // Shift in seconds from UTC - dịch chuyển tính bằng giây so với UTC
  id: number; // City ID - ID thành phố
  name: string; // City name - tên thành phố
  cod: number; // Response code - mã phản hồi
}

export interface ForecastResponse {
  cod: string; // Response code - mã phản hồi
  message: number; // Reponse message - tin nhắn phản hồi
  cnt: number; // Number of lines in the list - số dòng trong danh sách
  list: ForecastItem[]; // List of forecast data - danh sách dữ liệu dự báo
  city: { // City information - thông tin thành phố
    id: number; // City ID - ID thành phố
    name: string; // City name - tên thành phố
    coord: Coordinates; // City coordinates - tọa độ thành phố
    country: string; // Country code - mã quốc gia
    population: number; // Population - dân số
    timezone: number; // Timezone in seconds - múi giờ tính bằng giây
    sunrise: number; // Sunrise time - thời gian mặt trời mọc
    sunset: number; // Sunset time - thời gian mặt trời lặn
  };
}

export interface AirPollutionResponse {
  coord: number[]; // The coordinates [lon, lat] - tọa độ [kinh độ, vĩ độ]
  list: AirPollutionData[]; // List of air pollution data - danh sách dữ liệu ô nhiễm không khí
}

export interface WeatherData {
  currentWeather: CurrentWeatherResponse; // Data current weather - dữ liệu thời tiết hiện tại
  forecast: ForecastResponse; // Date report data - dữ liệu báo cáo ngày
  airPollution: AirPollutionResponse; // Data quality of air - dữ liệu chất lượng không khí
}

export interface WeatherForecastData {
  forecast: any; // Forecast data - dữ liệu dự báo
}

export interface City {
  name: string; // City name - tên thành phố
  country: string; // Country code - mã quốc gia
  lat: number; // Latitude - vĩ độ
  lon: number; // Longitude - kinh độ
}