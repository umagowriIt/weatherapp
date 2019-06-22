import React, { useState, useEffect } from "react";
import { All_Filters } from "../enums/constants";

const Filters = props => {

  // contains the selected value list for the weather type filtered out from the main weather api
  const [typeFilter, setTypeFilters] = useState([]);

  // gets invoked when the city is changed and calcultes the weather types from the main api data 
  useEffect(() => {
    let weatherTypes = [];
    props.weather.list.forEach(item => {
      if (item && item.weather && item.weather.length > 0) {
        if (
          !weatherTypes.find(pushedItm => pushedItm.id === item.weather[0].id)
        )
          weatherTypes.push(item.weather[0]);
      }

    });

    setTypeFilters(weatherTypes);
  }, [props.weather.city.name, props.weather.list]);

  return (
    <div className="filtersWrap">
      <select
        defaultValue={props.city}
        onChange={e => {
          props.filterChanged({
            type: All_Filters.CITY,
            value: e.target.value
          });
        }}
      >
        <option value="kochi">Kochi</option>
        <option value="delhi">Delhi</option>
        <option value="london">London</option>
        <option value="singapore">Singapore</option>
        <option value="australia">Australia</option>
      </select>
      <select
        value={props.type ? props.type : '0'}
        onChange={e => {
          props.filterChanged({
            type: All_Filters.WEATHER_TYPE,
            value: e.target.value
          });
        }}
      >
        <option value="0" 
        > -- Weather Type --</option>
        {typeFilter.map((type, index) => (
          <option key={index} value={type.id}>
            {type.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
