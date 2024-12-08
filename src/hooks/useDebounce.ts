import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    //delay using setTimeout 
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId); // Cleanup timeout on value change
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
