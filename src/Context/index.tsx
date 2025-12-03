import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';

// Define types for the weather data, values, and place
interface WeatherData {
  temp?: number;
  humidity?: number;
  wspd?: number;
  heatindex?: number;
  conditions?: string;
}

interface ValuesData {
  datetime: string;
  temp: number;
  conditions: string;
}

interface LocationData {
  address: string;
  values: ValuesData[];
}

interface ApiResponse {
  locations: Record<string, LocationData>;
}

// Define the context type
interface StateContextType {
  weather: WeatherData;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  values: ValuesData[];
  thisLocation: string;
  place: string;
  isLoading: boolean;
}

// Create the context with an initial value of null
const StateContext = createContext<StateContextType | null>(null);

// StateContextProvider Component props type
interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider: React.FC<StateContextProviderProps> = ({ children }) => {
  // Define states for the store API response
  const [weather, setWeather] = useState<WeatherData>({});
  const [values, setValues] = useState<ValuesData[]>([]);
  const [place, setPlace] = useState<string>('Noida,Uttar Pradesh Pradesh');
  const [thisLocation, setLocation] = useState<string>('');

  // Define state for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to get user's current location
  const getUserLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);  // Fetch weather for the user's current location
        },
        (error) => {
          console.error("Error getting location", error);
          setIsLoading(false);
          alert("Failed to get your location. Please enable location services.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  // Code to fetch weather data
  const fetchWeather = async (lat?: number, lon?: number): Promise<void> => {
    const ApiKey = '5396a8f5b1msh59de5c7dd15319bp1e20c5jsnd5b7858278a2';
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: lat && lon ? `${lat},${lon}` : place,  // Use lat/lon if available
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0,
      },
      headers: {
        'x-rapidapi-key': ApiKey,
        'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
      }
    };
  
    try {
      const response = await axios.request<ApiResponse>(options);
      console.log("aaaaaaaaaaaa",response)
      const thisData = Object.values(response.data.locations)[0]; // Explicitly type the response
  
      // Extract the city name from the address
      const cityName = thisData.address.split(',')[0];
      
      setLocation(cityName);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      alert('This place does not exist or an error occurred.');
    }
  };
  

  // Fetch updated weather whenever the place changes
  useEffect(() => {
    if (place === 'current') {
      getUserLocation();  // Use current location if "current" is selected
    } else {
      fetchWeather(); // else fetch weather that user search
    }
  }, [place]);

  return (
    //privide values from context
    <StateContext.Provider value={{
      weather,
      setPlace,
      values,
      thisLocation,
      place,
      isLoading,
    }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state context
export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("StateContext must be used within a StateContextProvider");
  }
  return context;
};
