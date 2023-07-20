import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="w-full h-[50px] rounded-md flex items-center justify-between bg-[rgba(255,255,255,0.2)] px-2">
      <input
        className="outline-none border-none w-full h-full rounded-md indent-2 bg-transparent focus:text-white"
        placeholder="Search Song, Artist"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <SearchIcon
        sx={{
          color: "white",
        }}
      />
    </div>
  );
}
