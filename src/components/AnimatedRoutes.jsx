import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ForYou from "../pages/ForYou";
import Favourites from "../pages/Favourites";
import RecentlyPlayed from "../pages/RecentlyPlayed";
import TopTracks from "../pages/TopTracks";
import { AnimatePresence } from "framer-motion";
import Quirky404Page from "../pages/Custom404";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ForYou />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/recently_played" element={<RecentlyPlayed />} />
        <Route path="/top_tracks" element={<TopTracks />} />
        <Route path="*" element={<Quirky404Page />}/>
      </Routes>
    </AnimatePresence>
  );
}
