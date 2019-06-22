import React , {memo} from "react";

import { Week_Days, config } from "../enums/constants";


const Forecast = memo(({ city, country, day }) => {
  // img icon url for the approriate weather
  const imgURl = `${config.imgUrl}${day.weather[0].icon}.png`;
  
  return (
    <div className="mainForecast">
      <h2>{city}, {country}</h2>
      <h3>{Week_Days[new Date(day.dt_txt).getDay()]}</h3>
      <h3>{day.weather[0].description}</h3>
      <h3 className="mainTemperature">
      <img src={imgURl} title="day.weather[0].description" alt="day.weather[0].description" />

        {day.main.temp} <span><sup>o</sup>C</span>
      </h3>
    </div>
  );
});

export default Forecast;
