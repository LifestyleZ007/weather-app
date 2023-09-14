import React, { useState, useRef } from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const  videoRef = useRef()
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.4;
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8c8f654d5a85b4b802988030d2ccdb3f`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then((res) => {
          setData(res.data)
          console.log(res.data);
        })

      setLocation('');

    }

  }

  return (
    <div className="app">

      <video 
        type="video/mp4" 
        className="background-video" 
        muted autoPlay loop 
        ref={videoRef}
        onCanPlay={() => setPlayBack()}
        src="vid1.mp4"
      >
      </video>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter a location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}

              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
