import axios from "axios";

const API_KEY = "fa4913e9435c45c042df3747cf825057"; // Replace with your OpenWeatherMap API key

export async function getWeather(lat, lon) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const data = res.data;

    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      city: data.name,
      country: data.sys.country
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    return null;
  }
}
