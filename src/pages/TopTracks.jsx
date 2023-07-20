import React, { useContext, useEffect } from 'react'
import { formatTime } from '../components/helper';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { GET_SONGS } from '../queries';
import { MainContext } from '../context/MainContext';
import { motion } from 'framer-motion';

export default function TopTracks() {
  const { data, error, loading } = useQuery(GET_SONGS, {
    variables: {
      playlistId: 2,
    },
  });

  const { selectedSong, setSelectedSong, currentPlaylist, setCurrentPlaylist} = useContext(MainContext)
  useEffect(() => {
    setCurrentPlaylist(data?.getSongs || []);
  },[data])
  return (
    <motion.div className="w-full h-full flex flex-col px-2 py-6 min-w-[300px] overflow-hidden" initial={{ opacity:0, overflow:"hidden"}} animate={{ opacity:"100%", overflow:"hidden"}} exit={{ opacity:0, overflow:"hidden"}}>
      <div className="pb-4 px-2">
        <Typography variant="h4" fontWeight={750} color={"white"}>
          Top Tracks
        </Typography>
      </div>
      <div className="mt-4">
      <List className="w-full overflow-y-auto">
          {data &&
            data?.getSongs.map((song) => {
              return (
                <ListItem
                  key={song._id}
                  className={`hover:bg-[rgba(0,0,0,0.1)] ${selectedSong._id === song._id ? "bg-[rgba(0,0,0,0.1)] " : ""}` }
                  disablePadding
                  secondaryAction={<div style={{color:"rgba(255,255,255,0.5)", fontSize:"14px"}}>{formatTime(song.duration)}</div>}
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
            })}
        </List>
      </div>
    </motion.div>
  )
}
