// filters the weather type from the api and removes the repeating days with same weather type
export const filterWeatherType = (weather, type) => {
    let list = { ...weather, list: [] };
    weather.list.forEach((item, index) => {
      let listLength = list.list.length;
  
      if (listLength > 0) {
        let prevDate = new Date(list.list[listLength - 1].dt_txt).getDate();
        let curDate = new Date(item.dt_txt).getDate();
  
        // checks and removes any prev date elements with the same weather type.
        if (
          item.weather[0].id.toString() === type &&
          !(
            list.list[listLength - 1].weather[0].id.toString() === type &&
            prevDate === curDate
          )
        )
          list.list.push(item);
      } else {
        if (item.weather[0].id.toString() === type) list.list.push(item);
      }
    });
  
    return list;
  };
  
  // chart data
  export const getBarData = (textLabel, labels = [], data = []) => {
    return {
      labels: labels,
      datasets: [
        {
          label: textLabel,
          backgroundColor: "rgba(193,193,193,0.4)",
          borderColor: "rgba(193,193,193,0.8)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(193,193,193,0.2)",
          hoverBorderColor: "rgba(193,193,193,0.6)",
          data: data
        }
      ]
    };
  };
  
  // scale data for chart
  export const getScale = (minValue = 0) => {
    return {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          // display:false,
          gridLines: {
            display: false
          },
          ticks: {
            min: minValue
          }
        }
      ]
    };
  };
  