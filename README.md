# 🌤️ Weather App

![Weather App Preview](https://weather-app-fawn-three-22.vercel.app/weather-app.png)

A modern, responsive **Weather Forecast Web App** built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.  
It provides real-time weather data, forecasts, air pollution, and interactive maps — beautifully visualized and fully responsive.

---

## 🌍 Live Demo

🔗 **[https://weather-app-fawn-three-22.vercel.app](https://weather-app-fawn-three-22.vercel.app)**  
_(Replace `<your-vercel-app>` with your actual Vercel deployment link)_

---

## ✨ Features

- 🌦 **Real-time weather** data (powered by OpenWeatherMap API)
- 🔍 **City search with live suggestions** & keyboard navigation
- 📍 **Detect current location** via Geolocation API
- 🕓 **Hourly and daily forecasts**
- 🌫 **Air pollution & UV index visualization**
- 💧 **Temperature and humidity charts**
- 🌇 **Sunrise, sunset & day duration info**
- 🗺 **Interactive Leaflet map**
- 🧩 **Responsive layout** with adaptive grid columns
- ♿ **Accessible design** (ARIA labels, keyboard-friendly)
- ⚡ **Optimized for performance** (lazy loading + debounced search)

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Framework** | [Next.js 14+ (App Router)](https://nextjs.org/) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com) |
| **Icons** | [lucide-react](https://lucide.dev) |
| **State Management** | Zustand (`useWeatherStore`) |
| **Charts** | Recharts |
| **Maps** | React Leaflet |
| **API** | [OpenWeatherMap](https://openweathermap.org/api) |

---

## 🧠 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Set up environment variables
Create a .env.local file in your project root and add:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
```

### 4️⃣ Run the development server
```bash
npm run dev
# or
yarn dev
```