import React, { useEffect, useState } from "react";
import './App.css';




function App() {
  const [ipCity,setIpCity] = useState('');
  const [cityWeather,setCityWeather] = useState({});
  const [load,setLoad] = useState(false);


  const fetchWeather = async()=>{
    setLoad(true);
    try{
      let res = await fetch (`https://api.weatherapi.com/v1/current.json?Key=754b649a25af4eb09d865631240106&q=${ipCity}`);
      let data = await res.json();
      if(data.hasOwnProperty("current")){
        setCityWeather(data);
       
      }else{
        throw new Error("not found")
      }
    }catch(err){
      alert("Failed to fetch weather data")
    }
    finally{
      setLoad(false)
    }
  }
  return (
    <div className="App">
      <div className="searchDiv">
        <div className="searchIp">
          <input type="text" placeholder="Enter city name" value={ipCity} onChange={(e)=>setIpCity(e.target.value)}/>
        </div>
        <button onClick={fetchWeather}>Search</button>
      </div>
      <div className="displayDiv">
        {
        load?<h5>Loading data...</h5>:cityWeather.hasOwnProperty("current")?<><div className="card">
          <p>Temperature</p>
          <span>{cityWeather.current.temp_c}°C</span>
        </div>
        <div className="card">
        <p>Humidity</p>
        <span>{cityWeather.current.humidity}%</span>
        </div>
        <div className="card">
        <p>Condition</p>
        <span>{cityWeather.current.condition.text}</span>
        </div>
        <div className="card">
        <p>Wind Speed</p>
        <span>{cityWeather.current.wind_kph}kph</span>
        </div></>:""
     }
      </div>
    </div>
  );
}

export default App;
