import axios from 'axios';

export default axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/forecast",
    transformResponse: [
        (data) => {
          let resp
    
          try {
            resp = JSON.parse(data)
          } catch (error) {
            alert("An error occured. Could not parse the data");
          }
    
          if (resp && resp.list && resp.list.length > 0) {
            return resp;
          } else {
            alert("An error occured. Could not load the data");
          }
        }
      ]
} )