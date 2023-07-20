import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { formatTime } from "../components/helper";
import { useQuery } from "@apollo/client";
import { GET_SONGS } from "../queries";
import { MainContext } from "../context/MainContext";
import { motion } from "framer-motion";
import Shimmer from "./Shimmer";

export default function ForYou() {
  const [query, setQuery] = useState("");
  const { data, error, loading, refetch } = useQuery(GET_SONGS, {
    variables: {
      playlistId: 1,
      search: "",
    },
  });

  const { selectedSong, setSelectedSong, currentPlaylist, setCurrentPlaylist } =
    useContext(MainContext);
  useEffect(() => {
    setCurrentPlaylist(data?.getSongs || []);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("timer");
      refetch({ playlistId: 1, search: query });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <motion.div
      className="w-full h-full flex flex-col px-6 py-6 min-w-[300px] overflow-hidden"
      initial={{ opacity: 0, overflow: "hidden" }}
      animate={{ opacity: "100%", overflow: "hidden" }}
      exit={{ opacity: 0, overflow: "hidden" }}
    >
      <div className="pb-4">
        <Typography variant="h4" fontWeight={750} color={"white"}>
          For You
        </Typography>
      </div>
      <div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <div className="mt-4 overflow-y-auto pr-4">
        {loading ? (
          <Shimmer />
        ) : (
          <List className="w-full h-[70%]">
            {data && data?.getSongs.length > 0 ? (
              data?.getSongs.map((song) => {
                return (
                  <ListItem
                    key={song._id}
                    className={`hover:bg-[rgba(0,0,0,0.1)] ${
                      selectedSong._id === song._id
                        ? "bg-[rgba(0,0,0,0.1)] "
                        : ""
                    }`}
                    disablePadding
                    secondaryAction={
                      <div
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "14px",
                        }}
                      >
                        {formatTime(song.duration)}
                      </div>
                    }
                    onClick={() => setSelectedSong(song)}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar src={song.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={song?.title}
                        secondary={song?.artist}
                        secondaryTypographyProps={{
                          color: "rgba(255, 255, 255, 0.8)",
                        }}
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <div>No results found</div>
            )}
          </List>
        )}
      </div>
    </motion.div>
  );
}
