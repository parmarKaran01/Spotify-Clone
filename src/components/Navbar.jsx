import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import { SideBarLinks } from "./helper";
import { Link } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import { motion} from "framer-motion"
import { MainContext } from "../context/MainContext";


const drawerWidth = "17rem";
export default function Navbar() {
  const [activeLink, setActiveLink] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getActiveLink, setActiveLinkId} = useContext(MainContext)
  useEffect(() => {
    const ele = getActiveLink()
  }, [activeLink])
  return (
    <>
      <div className="hidden md:block">
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              border: "none",
              width: drawerWidth,
              boxSizing: "border-box",
              // background: "linear-gradient(transparent, rgba(0,0,0, 0.5))",
              backgroundColor: "inherit",
              color: "rgba(255, 255, 255, 0.5)",
              paddingY: "1rem",
            },
          }}
          variant={"permanent"}
          anchor="left"
        >
          <Toolbar>
            <img src={Logo} alt="Spotify Logo" />
          </Toolbar>
          <List className="mt-4 px-4">
            {SideBarLinks.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => setActiveLink(item.id)}
                className={`${
                  activeLink === item.id ? "text-white" : "hover:text-white"
                } pl-4`}
              >
                <Link to={item.to}>
                  <ListItemText primary={item?.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>

      <div className="absolute md:hidden block top-6 right-3 z-10 text-white">
        {mobileOpen ? (
          <IconButton onClick={() => setMobileOpen(false)}>
            <Close sx={{
              color:"white"
            }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => setMobileOpen(true)}>
            <Menu sx={{
              color:"white"
            }}/>
          </IconButton>
        )}
      </div>

      {mobileOpen ? (
        <motion.div className="absolute top-0 h-screen w-2/3 bg-[rgba(0,0,0,0.9)] z-[999] py-2" key={mobileOpen} initial={{width:0, opacity:0}} animate={{width:"66.67%", opacity:"100%"}} exit={{width:0, opacity:0}}>
          <Toolbar>
            <img src={Logo} alt="Spotify Logo" />
          </Toolbar>
          <List className="mt-4 px-4">
            {SideBarLinks.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => {
                  setActiveLink(item.id);
                  setMobileOpen(false);
                }}
                className={`${
                  activeLink === item.id ? "text-white" : "hover:text-white"
                } pl-4`}
              >
                <Link to={item.to}>
                  <ListItemText primary={item?.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </motion.div>
      ) : null}
    </>
  );
}
