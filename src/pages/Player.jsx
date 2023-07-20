import { Container, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { PlayArrow, SkipNext } from "@mui/icons-material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MainContext } from "../context/MainContext";
import { usePalette } from "react-palette";

export default function Player() {
  const { selectedSong, setSelectedSong, currentPlaylist, color, setColor } =
    useContext(MainContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();
  const progressBar = useRef();

  const currentSongIndex = useMemo(() => {
    if (currentPlaylist === undefined) return -1;
    return currentPlaylist.findIndex((item) => {
      return item._id === selectedSong._id;
    });
  }, [selectedSong, currentPlaylist]);
  const {
    data: colorData,
    loading: colorLoading,
    error: colorError,
  } = usePalette(selectedSong.photo);

  useEffect(() => {
    setColor(colorData.darkMuted);
  }, [colorData]);
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
      console.log(audioPlayer.current);
    } else {
      audioPlayer.current.pause();
    }
  }, [selectedSong, isPlaying]);

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
  };

  const handlePrev = () => {
    if (currentSongIndex > 0) {
      const newInd = currentSongIndex - 1;
      setSelectedSong(currentPlaylist[newInd]);
      progressBar.current.value = 0;
      audioPlayer.current.currentTime = 0
      setIsPlaying(true);
    }
  };
  const handleNext = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      const newInd = currentSongIndex + 1;
      setSelectedSong(currentPlaylist[newInd]);
      progressBar.current.value = 0;
      audioPlayer.current.currentTime = 0
      setIsPlaying(true);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
      <Container
        // maxWidth="sm"
        sx={{
          height: "600px",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="lg:w-3/4 md:w-3/4 w-full">
          <Typography variant="h4" fontWeight={750} className="font-inter">
            {selectedSong?.title}
          </Typography>
          <Typography color={"rgba(255, 255, 255, 0.8)"}>
            {selectedSong?.artist}
          </Typography>
        </div>
        <div className="mt-auto lg:h-[70%] lg:w-3/4 md:w-3/4 w-full">
          <img
            src={selectedSong.photo}
            alt="poster"
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="w-[80%] md:w-3/4 mt-4">
          <input
            type="range"
            defaultValue={"0"}
            min={0}
            max={selectedSong.duration}
            className="w-full"
            ref={progressBar}
            onChange={changeRange}
          />
          <audio src={selectedSong.url} ref={audioPlayer} />
        </div>
        <div className="mt-auto flex justify-between items-center lg:gap-2 md:gap-2 gap-8 lg:w-3/4 md:w-3/4 w-full">
          <IconButton
            sx={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <div className="flex items-center gap-2">
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={handlePrev}
            >
              <SkipPreviousIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrow />}
            </IconButton>

            <IconButton
              sx={{
                color: "white",
              }}
              onClick={handleNext}
            >
              <SkipNext />
            </IconButton>
          </div>
          <IconButton
            sx={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            <VolumeUpIcon />
          </IconButton>
        </div>
      </Container>
    </div>
  );
}
