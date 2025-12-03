// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./components";
import { RotatingLines } from "react-loader-spinner";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import useDebounce from "./hooks/useDebounce";

// Types for weather values that recicve from api

interface Weather {
  temp: number;
  humidity: number;
  heatindex: number;
  wspd: number;
  conditions: string;
}

interface WeatherValues {
  datetime: string;
  temp: number;
  conditions: string;
}

interface WeatherContext {
  weather: Weather;
  thisLocation: string;
  values: WeatherValues[] | null;
  place: string;
  setPlace: (place: string) => void;
  isLoading: boolean;
}

function App() {
  const [input, setInput] = useState<string>(""); // Input state for user input
  //extract values form context
  const { weather, thisLocation, values, setPlace, isLoading } =
    useStateContext() as WeatherContext;

  const debouncedInput = useDebounce(input, 2000); // Debounced version of input

  // Submit city on debounced input change
  useEffect(() => {
    if (debouncedInput) {
      setPlace(debouncedInput);
      setInput(""); // Reset input
    }
  }, [debouncedInput, setPlace]);

  const handleGetCurrentLocation = () => {
    setPlace("current"); // Trigger on if user set local location weather
  };

  return (
    <section className="max-w-screen-xl mx-auto h-full px-4 py-2">
      {/* Conditionally render loading spinner */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl z-50">
          <div className="text-white text-3xl">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="32"
              visible={true}
            />
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="w-full px-2 py-4 flex items-center justify-between gap-x-12 border rounded-xl bg-white/20 backdrop-blur-lg">
        <a href="/" className="flex items-center w-fit gap-x-4">
          <div className="size-10 flex items-center justify-center">
            <img src="/logo.svg" />
          </div>
          <div className="bg-gradient-to-r bg-clip-text from-sky-500 to-sky-800">
            <h1 className="font-extrabold tracking-tighter text-2xl md:text-3xl text-transparent">
              Wheather App
            </h1>
          </div>
        </a>

        {/* Search input */}
        <div className="bg-white hidden md:flex shadow-md rounded-lg items-center flex-1 p-2 gap-3">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            type="text"
            placeholder="Search Location"
            className="focus:outline-none w-full text-[#212121] text-lg px-2 py-1 rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && setPlace(input)}
          />
        </div>

        {/* Button to get current location */}
        <button
          onClick={handleGetCurrentLocation}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          } text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto`}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <span className="flex items-center gap-x-2">
              <CiLocationOn className="size-6" />
              <p>Local Weather</p>
            </span>
          )}
        </button>
      </nav>

      {/* Search input for mobile */}
      <div className="bg-white flex mt-4 md:hidden shadow-md rounded-lg items-center flex-1 p-2 gap-3">
        <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
        <input
          type="text"
          placeholder="Search Location"
          className="focus:outline-none w-full text-[#212121] text-lg px-2 py-1 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && setPlace(input)}
        />
      </div>

      <BackgroundLayout />

      {/* Weather Display */}
      <main>
        {/* Weather Card */}
        <div className="w-full">
          <WeatherCard
            place={thisLocation}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />
        </div>

        {/* 6-Day Forecast */}
        <div className="max-w-2xl mx-auto mt-4 flex flex-col bg-white/20 backdrop-blur-lg rounded-xl mb-4">
          <div className="flex items-center gap-x-2 font-light border-b border-black/30 px-6 py-2">
            <SlCalender className="size-6" />
            <span className="text-xl font-semibold">6-Day Forecast</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-2">
            {values?.slice(1, 7).map((curr) => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}

export default App;
