import React, { useEffect, useState } from "react";
// import { useDate } from "../utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { FaCloudSun } from "react-icons/fa";

import "../index.css";

// Define prop types
interface WeatherCardProps {
  temperature: number;
  windspeed: number;
  humidity: number;
  place: string;
  heatIndex: number | null;
  iconString: string;
  conditions: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState<string>(sun);
  // const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      const lowerIconString = iconString.toLowerCase();
      if (lowerIconString.includes("cloud")) {
        setIcon(cloud);
      } else if (lowerIconString.includes("rain")) {
        setIcon(rain);
      } else if (lowerIconString.includes("clear")) {
        setIcon(sun);
      } else if (lowerIconString.includes("thunder")) {
        setIcon(storm);
      } else if (lowerIconString.includes("fog")) {
        setIcon(fog);
      } else if (lowerIconString.includes("snow")) {
        setIcon(snow);
      } else if (lowerIconString.includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg mt-4 flex flex-col justify-center p-4 text-black gap-y-4">
      <div className="flex size-32 justify-center items-center mx-auto">
        <img src={icon} alt="weather_icon" className="size-full" />
      </div>
      <h3 className="font-bold text-5xl tracking-tight md:text-7xl flex justify-center items-center">
        {temperature} &deg;C
      </h3>
      <div className="font-semibold tracking-wide text-center text-lg">
        {place}  
      </div>
      {/* <div className="flex items-center font-semibold gap-x-4">
        <p className="text-2xl">{new Date().toDateString().split(" ")[0]}</p>
        <p>{time}</p>
      </div> */}
      <div className="mx-auto w-full gap-x-4 gap-y-2 grid grid-cols-1 sm:grid-cols-2">
        <div className="p-2 font-bold border border-black/30 rounded-lg w-full flex flex-col justify-center flex-wrap">
          <div className="flex items-center gap-x-4">
            <WiStrongWind className="size-10" />
            <span className="text-xl font-thin tracking-wide">Wind Speed</span>
          </div>
          <div className="text-center mt-4">
            <p className="font-thin tracking-tight text-3xl">
              {windspeed} km/h
            </p>
          </div>
        </div>
        <div className="p-2 font-bold border border-black/30 rounded-lg w-full flex flex-col justify-center flex-wrap">
          <div className="flex items-center gap-x-4">
            <WiHumidity className="size-10" />
            <span className="text-xl font-thin tracking-wide">Humidity</span>
          </div>
          <div className="text-center mt-4">
            <p className="font-thin tracking-tight text-3xl">
              {humidity} gm/m&#179;
            </p>
          </div>
        </div>
        <div className="p-2 font-bold border border-black/30 rounded-lg w-full flex flex-col justify-center flex-wrap">
          <div className="flex items-center gap-x-4">
            <WiThermometer className="size-10" />
            <span className="text-xl font-thin tracking-wide">Heat Index</span>
          </div>
          <div className="text-center mt-4">
            <p className="font-thin tracking-tight text-3xl">
              {heatIndex !== null ? heatIndex : "N/A"}
            </p>
          </div>
        </div>
        <div className="p-2 font-bold border border-black/30 rounded-lg w-full flex flex-col justify-center flex-wrap">
          <div className="flex items-center gap-x-4">
            <FaCloudSun className="size-10" />
            <span className="text-xl font-thin tracking-wide">
              Weather Condition
            </span>
          </div>
          <div className="text-center mt-4">
            <p className="font-thin tracking-tight text-3xl">{conditions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
