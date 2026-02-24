import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "kulturverein-hennersdorf",
  title: "Kulturverein Hennersdorf",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],

  schema: {
    types: schemaTypes,
  },
});
