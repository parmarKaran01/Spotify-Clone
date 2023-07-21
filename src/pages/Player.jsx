import { Container, IconButton, Slider, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { PlayArrow, SkipNext } from "@mui/icons-material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MainContext } from "../context/MainContext";
import { usePalette } from "react-palette";

export default function Player() {
  const { selectedSong, setSelectedSong, currentPlaylist, setColor } =
    useContext(MainContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const {
    data: colorData,
    loading: colorLoading,
    error: colorError,
  } = usePalette(selectedSong.photo);

  useEffect(() => {
    setColor(colorData.darkVibrant);
  }, [colorData]);

  const currentSongIndex = useMemo(() => {
    if (currentPlaylist === undefined) return -1;
    return currentPlaylist.findIndex((item) => {
      return item._id === selectedSong._id;
    });
  }, [selectedSong, currentPlaylist]);
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [isPlaying, selectedSong]);

  useEffect(() => {
    audioPlayer.current.currentTime = 0;
    setIsPlaying(true);
  }, [selectedSong]);

  const changeRange = (e) => {
    audioPlayer.current.currentTime =
      (e.target.value * audioPlayer.current.duration) / 100;
  };

  const handlePrev = () => {
    if (currentSongIndex > 0) {
      const newInd = currentSongIndex - 1;
      setSelectedSong(currentPlaylist[newInd]);
    }
  };
  const handleNext = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      const newInd = currentSongIndex + 1;
      setSelectedSong(currentPlaylist[newInd]);
    }
  };

  const handleUpdate = () => {
    const currentProgress = parseInt(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
    setProgress(isNaN(currentProgress) ? 0 : currentProgress);
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
          <Slider
            aria-label="time-indicator"
            size="small"
            value={progress}
            step={0.1}
            onChange={(_, value) => {
              audioPlayer.current.currentTime =
                (value * audioPlayer.current.duration) / 100;
            }}
            sx={{
              color: "#fff",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 4,
                height: 4,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
          <audio
            src={selectedSong.url}
            ref={audioPlayer}
            onTimeUpdate={handleUpdate}
            onEnded={handleNext}
          />
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
