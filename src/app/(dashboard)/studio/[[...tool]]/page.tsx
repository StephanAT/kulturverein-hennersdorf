"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export default function StudioPage() {
  return (
    <>
      <style>{`
        #sanity, [data-ui="NextStudioLayout"] {
          height: 100% !important;
          max-height: 100% !important;
        }
      `}</style>
      <div
        style={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NextStudio config={config} />
      </div>
    </>
  );
}
