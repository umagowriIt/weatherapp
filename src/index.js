import React from "react";
import ReactDOM from "react-dom";

import Weather from "./components/Weather";

const App = () => {
  return (
    <div>
      <Weather />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
