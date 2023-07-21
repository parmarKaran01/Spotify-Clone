import { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Player from "./pages/Player";
import { useQuery, gql } from "@apollo/client";
import { GET_PLAYLIST } from "./queries";
import MobilePlayer from "./pages/MobilePlayer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { useWindowSize } from "./components/hooks/useWindowSize";
import { MainContext } from "./context/MainContext";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { data, error, loading } = useQuery(GET_PLAYLIST);
  const [width, height] = useWindowSize();
  const { color } = useContext(MainContext);
  return (
    <AnimatePresence>
      <motion.div
        className={`w-screen h-screen lg:h-screen md:h-screen flex lg:flex-row md:flex-row sm:items-stretch flex-col bg-gradient-to-t from-slate-900 font-poppins`}
        style={{
          backgroundColor: color,
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: "100%",
        }}
        exit={{ opacity: 0 }}
      >
        {/* <div className="hidden lg:flex md:flex"> */}
        <Navbar data={data?.getPlaylists} loading={loading} />
        {/* </div> */}
        <div className="md:w-[30%] w-full h-full md:block">
          <AnimatedRoutes />
        </div>

        {width <= 786 ? (
          <div className="fixed z-50 bg-black w-full bottom-0 left-0">
            <MobilePlayer />
          </div>
        ) : (
          <div className="lg:w-[50%] hidden md:w-[50%] md:block">
            <Player />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
