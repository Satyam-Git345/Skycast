import { useStateContext } from "../Context";
import Clear from "../assets/images/Clear.jpg";
import Fog from "../assets/images/fog.png";
import Cloudy from "../assets/images/Cloudy.jpg";
import Rainy from "../assets/images/Rainy.jpg";
import Snow from "../assets/images/snow.jpg";
import Stormy from "../assets/images/Stormy.jpg";

import { useEffect, useState } from "react";

interface Weather {
  conditions: string;
}

//Component for setting background image according to weather condition in peticllar city that 
//user select
const BackgroundLayout = () => {
  const { weather } = useStateContext() as unknown as { weather: Weather };

  const [image, setImage] = useState<string>(Clear);  //state for set current weater image

  // set background image when the weather city change
  useEffect(() => {
    if (weather.conditions) {
      const imageString = weather.conditions.toLowerCase();

      if (imageString.includes("clear")) {
        setImage(Clear);
      } else if (imageString.includes("cloud")) {
        setImage(Cloudy);
      } else if (
        imageString.includes("rain") ||
        imageString.includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.includes("snow")) {
        setImage(Snow);
      } else if (imageString.includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.includes("thunder") ||
        imageString.includes("storm")
      ) {
        setImage(Stormy);
      }
    }
  }, [weather]);

  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10] object-cover"
    />
  );
};

export default BackgroundLayout;
