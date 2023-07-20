import { Skeleton } from "@mui/material";
import React from "react";

export default function Shimmer() {
  return (
    <div>
      {Array(4)
        .fill(null)
        .map((u, i) => {
          return (
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              className="my-2"
            />
          );
        })}
    </div>
  );
}
