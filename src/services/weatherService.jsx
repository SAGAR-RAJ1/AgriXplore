import axios from "axios";
const API_KEY = "fa4913e9435c45c042df3747cf825057";
export async function getForecast(lat, lon) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const list = res.data.list; // 3-hour intervals

    // Convert to daily averages
    const daily = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) daily[date] = { temp: [], humidity: [] };
      daily[date].temp.push(item.main.temp);
      daily[date].humidity.push(item.main.humidity);
    });

    const dailyAvg = Object.keys(daily).map((date) => ({
      date,
      avgTemp:
        daily[date].temp.reduce((a, b) => a + b, 0) /
        daily[date].temp.length,
      avgHumidity:
        daily[date].humidity.reduce((a, b) => a + b, 0) /
        daily[date].humidity.length,
    }));

    return dailyAvg;
  } catch (error) {
    console.error("Forecast API Error:", error);
    return [];
  }
}
