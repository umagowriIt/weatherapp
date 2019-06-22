import React from "react";

import { config, Week_Days } from "../enums/constants";

const WeatherDays = ({filteredList, setDayFn, day}) => {
  
  return (
    <div>
        <ul className="weatherDays flexContainer">
          {filteredList
            .map((record, index) => (
              <li
                className={day.dt === record.dt ? "active" : ""}
                onClick={() => setDayFn(record)}
                key={index}
              >
                <p className="day">{(Week_Days[new Date(record.dt_txt).getDay()]).substr(0,3)}</p> 
                <p>{new Date(record.dt_txt).getDate()}  at {new Date(record.dt_txt).toLocaleTimeString(
      {},
      { hour12: true, hour: "numeric" }
    )}</p>
                <p>
                  <img src={`${config.imgUrl}${record.weather[0].icon}.png`} alt={record.weather[0].description} title={record.weather[0].description} />
                </p>
                <p> 
                  <span>{Math.trunc(record.main.temp_max)}<sup>o</sup></span>
                  <span>{Math.trunc(record.main.temp_min)}<sup>o</sup></span>
                </p>
              </li>
            ))}
        </ul> 
    </div>
  );
};

export default WeatherDays;
