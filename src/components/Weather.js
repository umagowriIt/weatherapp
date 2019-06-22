import React, { useState, useEffect } from "react";

import "../styles/weather.css";
import Forecast from "./Forecast";
import WeatherDays from "./WeatherDays";
import Filters from "./Filters";
import { filterWeatherType } from "../shared/filterFunctions";
import { All_Filters, config } from "../enums/constants";
import GraphFilters from "./GraphFilters";
import api from '../api';


const Weather = () => {
  // contains the current city set by the user. default kochi
  const [city, setCity] = useState("kochi");

  // the main weather response from the api
  const [weather, setWeather] = useState([]);

  // indicates whether the loader is to be displayed or not
  const [loader, setLoader] = useState(true);

  // contains the current day chosen by the user
  const [day, setDay] = useState({});

  // contains the weather type filter chosen by user
  const [type, setType] = useState("0");

  // filtered list of data from the main weather api
  const [filteredList, setFilteredList] = useState([]);


  // calls the api when the city is changed
  useEffect(() => {
    setLoader(true);
    (async () => {
      const response = await api.get(
        `?q=${city}&units=metric&APPID=${
          config.apiKey
        }`
      );
      resetFilters(response.data);
    })();
  }, [city]);


  // filteres the api and saves the data in filteredlist when the type is changed
  useEffect(() => {
    if (!type || type === "0") {
      resetFilters(weather);
    } else
    if (weather && weather.list) {
      let filteredWeatherType = filterWeatherType(weather, type);
      if (filteredWeatherType.list && filteredWeatherType.list.length > 0) {
        setFilteredList(filteredWeatherType.list);
        setDay(filteredWeatherType.list[0]);
      }
    } 
  }, [type, weather]);

  // reset or init all the filters and the main weather data
  const resetFilters = data => {
    if (data && data.list) {
      let list = data.list.filter(
        record => new Date(record.dt_txt).getHours() === 12
      );

      setFilteredList(list);
      setDay(list[0]);
      setWeather(data);
      setType("0");
      setLoader(false);
    }
  };

  // callback function for weatherDays compnent
  const setDayFn = data => {
    setDay(data);
  }

  // callback function for the filter compnent
  const filterChanged = e => {
    switch (e.type) {
      case All_Filters.CITY:
        setCity(e.value);
        break;

      case All_Filters.WEATHER_TYPE:
        setType(e.value);
        break;

      default:
        break;
    }
  };

  if (weather && weather.list) {
    return (
      <section id="weatherMainWrap">
      {loader && <span className="loaderContent">lOADING...</span>}
        <div className="flexContainer">
        <Forecast city={weather.city.name} country={weather.city.country} day={day} />

        <Filters
          filterChanged={filterChanged}
          weather={weather}
          city={city}
          type={type}
        />
        </div>

        <GraphFilters filteredList={filteredList} />

        <WeatherDays filteredList={filteredList} setDayFn={setDayFn} day={day} />
      
      </section>
    );
  } else {
    return <section id="weatherMainWrap"><span className="loaderContent">lOADING...</span></section>;
  }
};

export default Weather;
