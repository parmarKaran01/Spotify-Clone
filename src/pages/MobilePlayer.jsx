import {
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
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
  const audioPlayer = useRef();
  const progressBar = useRef();
  const { data : colorData, loading: colorLoading, error: colorError } = usePalette(selectedSong.photo)

  useEffect(() => {
    setColor(colorData.darkVibrant)
  }, [colorData])

  const currentSongIndex = useMemo(() => {
    if (currentPlaylist === undefined) return -1;
    return currentPlaylist.findIndex((item) => {
      return item._id === selectedSong._id;
    });
  }, [selectedSong, currentPlaylist]);
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
      progressBar.current.value = 0
      setSelectedSong(currentPlaylist[newInd]);
    }
  };
  const handleNext = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      const newInd = currentSongIndex + 1;
      progressBar.current.value = 0
      setSelectedSong(currentPlaylist[newInd]);
    }
  };

  return (
    <div className="w-full h-[100px] flex flex-col px-2 py-2 gap-2">
      <div className="w-full flex items-center justify-between px-2">
        <div className="w-[40%] h-[50px] flex items-start gap-2 overflow-hidden">
            <Avatar src={selectedSong.photo} className="mt-2"/>
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
              <SkipPreviousIcon className="h-4 w-4"/>
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
        <input
          type="range"
          defaultValue={"0"}
          min={0}
          max={selectedSong.duration}
          className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
          ref={progressBar}
          onChange={changeRange}
          
        />
        <audio src={selectedSong.url} ref={audioPlayer} />
      </div>
    </div>
  );
}
