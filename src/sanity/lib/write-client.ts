import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const writeClient =
  projectId && process.env.SANITY_API_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
      })
    : null;
