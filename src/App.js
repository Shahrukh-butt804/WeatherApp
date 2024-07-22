import { useState, useEffect } from "react";
import './App.css';
import cloudy from "./assets/cloudy.png"
import widnimg from "./assets/wind.png"
import humidity from "./assets/humidity.png"

function App() {

  const [city, setCity] = useState("karachi");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetchWeather();
  }, [])
  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=911d5dd511433986c1a4a174be650edd&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.cod === "404") {
          setWeather("")
        } else {
          setWeather(data)
        }

      })
      .catch((error) => {

        console.log(error.message)
      }
      );
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };







  return (
    <>
      <div className="container flex justify-center items-center max-w-full h-screen bg-slate-200  border border-green-500">

        <div className="bg-red-200 h-3/4 lg:w-1/3 sm:w-1/2 sm:mx-auto rounded shadow-lg shadow-purple-500">

          {/* Search Bar */}
          <div className="mt-3">
            <div className="text-center m-1 p-2">
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="p-2 me-2 rounded-2xl border border-purple-300" />
              <button
                onClick={fetchWeather}
                className="bg-purple-700 p-2 hover:bg-purple-500 text-white font-bold rounded-xl">search</button>
            </div>
          </div>



          {/* Image */}
          <div className="flex justify-around mt-5">
            <img src={cloudy} width={150} alt="" />
          </div>

          {weather ?
            <>


              {/* Temperature */}
              <div className="text-center p-1 mt-4  text-5xl">
                <h1>{weather?.main.temp}<sup>o</sup> C</h1>
              </div>

              {/* CityName */}
              <div className="text-center p-2 mt-1 ">
                <h1 className="text-purple-950 font-bold text-3xl">{weather?.name}</h1>
              </div>


              {/* wheather Detail */}
              <div className="flex justify-between gap-12 items-center px-2 mt-5 ms-[-5px]">

                <div className="text-center p-2 text-md font-bold 
                text-purple-950">
                   <div className="flex gap-2 justify-center items-center">
                    <img className="mt-1" src={humidity} width={25} alt="" />
                    <h1 className="text-2xl">{weather?.weather[0].main}</h1>

                  </div>

                  <div>
                    <h1 className="ms-8">Weather</h1>
                  </div>



                </div>

                <div className="text-center p-2 mt-1 text-md  
                font-bold
                text-purple-950">

                  <div className="flex gap-2 justify-center items-center">
                    <img className="mt-1" src={widnimg} width={25} alt="" />
                    <h1 className="text-2xl">{weather?.wind.speed}KM/h</h1>

                  </div>

                  <div>
                    <h1 className="ms-2">Wind speed</h1>
                  </div>
                </div>

              </div>


            </>
            :
            <>
              <h1 className="text-center p-2 mt-1 text-2xl ">No Data Found</h1>
            </>}










        </div>




      </div>

    </>


  );
}

export default App;


// 911d5dd511433986c1a4a174be650edd api key

// https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=911d5dd511433986c1a4a174be650edd api ready