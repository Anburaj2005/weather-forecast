import "./App.css";
import { useState,useEffect } from "react";

function App() {
  const [place, setPlace] = useState("new york");
  const [placeInfo, setPlaceInfo] = useState();
 
  useEffect(()=> {
    handleFetch();
  }, []);
 
  function handleFetch() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=2c9cd7995a544c0c8c0103134222201&q=${place}&days=1&aqi=no&alerts=no`)
      .then((response) => response.json())
      .then((data) => setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        farenheit: {
          current: data.current.temp_f,
          high: data.forecast.forecastday[0].day.maxtemp_f,
          low: data.forecast.forecastday[0].day.mintemp_f
        },
        condition: data.current.condition.text
      })
      );

  }

  return (
    <div
      className="app">
        
      <div className="search-input">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={handleFetch}>Search</button>
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}° F</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.farenheit?.high}° F</h1>
            <h1>{placeInfo.farenheit?.low}° F</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;