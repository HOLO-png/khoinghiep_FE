import { formatToLocalTime } from "src/@core/services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="timeandlocation">
        <p className="textformatToLocalTime">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="timeandlocation">
        <p className="textformatToLocalTime">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
