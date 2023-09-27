import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "src/@core/services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="detail">
        <p>{details}</p>
      </div>

      <div className="temperature">
        <img src={iconUrlFromCode(icon)} alt="" style={{ width: '5rem' }} />
        <p style={{ fontSize: '3rem', lineHeight: '1' }}>{`${temp.toFixed()}°`}</p>
        <div className="temperature-item">
          <div className="temperature-item-icon">
            <UilTemperature size={18} className="mr-1" />
            Real fell:
            <span className="temperature-item-text">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="temperature-item-icon">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="temperature-item-text">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="temperature-item-icon">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="temperature-item-text">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="box-main">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="text-nomal">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="text-nomal ">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          High:{" "}
          <span className="text-nomal ">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          Low:{" "}
          <span className="text-nomal">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
