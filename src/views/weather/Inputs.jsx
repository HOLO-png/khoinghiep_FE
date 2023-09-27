import { useState } from "react";
import { toast } from "react-toastify";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="input-form">
      <div className="input-form-1">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="input-item"
        />
        <UilSearch
          size={25}
          className="UIsearch"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="UIlocation"
          onClick={handleLocationClick}
        />
      </div>

      <div className="input-imperial">
        <button
          name="metric"
          className="btn-imperial"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-white">|</p>
        <button
          name="imperial"
          className="btn-imperial "
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
