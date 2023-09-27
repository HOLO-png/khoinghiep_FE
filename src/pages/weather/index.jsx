import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButtons from "src/views/weather/TopButtons";
import Inputs from "src/views/weather/Inputs";
import TimeAndLocation from "src/views/weather/TimeAndLocation";
import Forecast from "src/views/weather/Forecast";
import getFormattedWeatherData from "src/@core/services/weatherService";
import TemperatureAndDetails from "src/views/weather/TemperatureAndDetails";

function Weather() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "bg-set";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "bg-set";

    return "bg-set";
  };

  return (
    <div
      className={`weather ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div style={{ padding: '40px' }}>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default Weather;
