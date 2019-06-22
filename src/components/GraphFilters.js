import React, { useState, useEffect } from "react";
import { Bar, Line  } from "react-chartjs-2";

import { Other_Filters, Week_Days } from "../enums/constants";
import { getBarData, getScale } from "../shared/filterFunctions";

import '../styles/chart.css';

const GraphFiters = ({ filteredList }) => {
  // contains the data for the chart
  const [chartData, setChartData] = useState({});

  // contains the scaling information for the chart
  const [scale, setScale] = useState([]);

  // contains the currently selected filter type by the user
  const [otherFilterType, setOtherFilterType] = useState(Other_Filters[0]);

  // gets invoked when filteredlist is changed for when user changes the filter type
  // calculates the data required for the chart from the filtered list
  useEffect(() => {
    let labels = filteredList.map(item => `${new Date(item.dt_txt).getDate()} - ${(Week_Days[new Date(item.dt_txt).getDay()]).substr(0,3)}` );
     let data = filteredList.map(item => item.main[otherFilterType]);

    let minVal = Math.min(...data) - 1;
    setScale(getScale(minVal));
    setChartData(getBarData(otherFilterType, labels, data));
  }, [filteredList, otherFilterType]);

  const otherTypeChanged = e => {
    setOtherFilterType(e.target.value);
  };

  return (
    <div className="graphFilter">
      <h6>Choose a Filter</h6>
      <ul className="customRadio">
        {Other_Filters.map((filterItem, index) => (
          <li 
          className={otherFilterType === filterItem ? 'active' : ''}
          key={index}>
            <label>
              <input
                checked={otherFilterType === filterItem}
                onChange={otherTypeChanged}
                type="radio"
                value={filterItem}
                name="otherTypeFilter"
              />
              {filterItem}
            </label>
          </li>
        ))}
      </ul>
     
     { otherFilterType === Other_Filters[0] && <Bar
        data={chartData}
        width={250}
        height={150}
        options={{
          maintainAspectRatio: true,
          scales: scale
        }}
      />
      }

      { otherFilterType === Other_Filters[1] && <Line 
        data={chartData}
        width={250}
        height={150}
        options={{
          maintainAspectRatio: true,
          scales: scale
        }}
      />
      }

      { otherFilterType === Other_Filters[2] && <Line  
        data={chartData}
        width={250}
        height={150}
        options={{
          maintainAspectRatio: true,
          scales: scale
        }}
      />
      }
    </div>
  );
};

export default GraphFiters;
