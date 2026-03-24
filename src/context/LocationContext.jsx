import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [water, setWater] = useState("");

  const clearAdvisoryInputs = () => {
    setCrop("");
    setSoil("");
    setWater("");
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        crop,
        setCrop,
        soil,
        setSoil,
        water,
        setWater,
        clearAdvisoryInputs,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useGlobalLocation = () => useContext(LocationContext);
