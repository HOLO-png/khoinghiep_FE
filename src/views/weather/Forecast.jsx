import React from "react";
import { iconUrlFromCode } from "src/@core/services/weatherService";

function Forecast({ title, items }) {

  return (
    <div>
      <div className="forecast">
        <p className="forecast-text">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="forecast-content">
        {/* this commented code is what I teach during the video
        it has missing key and will show error in browser console
        so use the code below
        what I have done is just added index to loop and
        key attribute to the div element */}

        {items.map((item, idx) => (
          <div className="forecast-content-item" key={idx}>
            <p className="forecast-text">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="img-css"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}

        {items.map((item, index) => (
          <div
            key={index}
            className="forecast-content-item"
          >
            <p className="forecast-text">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="img-css"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
