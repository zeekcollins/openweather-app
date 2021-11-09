import './App.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';


const api = {
  key: "33da79a0cac495f8a5e90494c9e2d814", 
  url: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 60) ? ("app warm") : ("app cold") : ("app")}>
      <main>
        <div className="search-bar">
            <div className="search-bar-content">
                <input 
                  type="text" 
                  className="search-text" 
                  placeholder="Enter a city..." 
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                  required/>
                <a href="zeekcollins.com" className="search-btn">
                  <FontAwesomeIcon className="icon" icon={faSearch}/>
                </a>
            </div>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}° F</div>
            <div className="weather">{weather.weather[0].main}</div>
            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon"/>
          </div>
        </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
