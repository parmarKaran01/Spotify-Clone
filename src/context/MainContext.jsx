import { createContext, useState } from "react";
import { useWindowSize } from "../components/hooks/useWindowSize";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  //   const [activePage, setActivePage] = useState(1);
  const [selectedSong, setSelectedSong] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [color, setColor] = useState("");

  const getActiveLink = () => {
    return sessionStorage.getItem("tab");
  };

  const setActiveLinkId = (val) => {
    sessionStorage.setItem("tab", val);
  };

  return (
    <MainContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        currentPlaylist,
        setCurrentPlaylist,
        color,
        setColor,
        getActiveLink,
        setActiveLinkId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
