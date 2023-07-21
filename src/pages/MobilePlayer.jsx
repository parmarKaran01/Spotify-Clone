import { Avatar, IconButton, Slider, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { PlayArrow, SkipNext } from "@mui/icons-material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { usePalette } from "react-palette";

export default function MobilePlayer() {
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
    setIsPlaying(true)
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
    <div className="w-full h-[100px] flex flex-col px-2 py-2 gap-2">
      <div className="w-full flex items-center justify-between px-2">
        <div className="w-[40%] h-[50px] flex items-start gap-2 overflow-hidden">
          <Avatar src={selectedSong.photo} className="mt-2" />
          <div className="mt-2">
            <Typography fontSize={14}>{selectedSong?.title}</Typography>
            <Typography fontSize={12}>{selectedSong?.artist}</Typography>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={handlePrev}
            >
              <SkipPreviousIcon className="h-4 w-4" />
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
      </div>

      <div className="w-full">
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
    </div>
  );
}
