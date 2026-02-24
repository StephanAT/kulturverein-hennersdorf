"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export default function StudioPage() {
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NextStudio config={config} />
    </div>
  );
}
