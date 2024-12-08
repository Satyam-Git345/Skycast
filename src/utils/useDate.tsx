import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface UseDateReturn {
  day: string;
  date: string;
  time: string;
}

export const useDate = (): UseDateReturn => {
  const [today, setDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.format("dddd"); // Get the weekday
  const date = today.format("dddd, D, MMMM"); // Format date as 'Day, Date, Month'
  const time = today.format("h:mm A"); // Format time as 'Hour:Minute AM/PM'

  return {
    day,
    date,
    time,
  };
};
