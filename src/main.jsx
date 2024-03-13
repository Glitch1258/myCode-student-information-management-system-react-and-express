import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './main.css'
/*in the code below we are creating a react DOM and rendering it in a <div id = "root" >
the react DOM contains the <APP/> which is described by the app.jsx . The the app.jsx
component contains all of our other components. That's react as i understand it currently
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
