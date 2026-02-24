import { type SchemaTypeDefinition } from "sanity";
import { pageType } from "./pageType";
import { eventType } from "./eventType";
import { teamMemberType } from "./teamMemberType";
import { sponsorType } from "./sponsorType";
import { projectType } from "./projectType";
import { blockContentType } from "./blockContentType";

export const schemaTypes: SchemaTypeDefinition[] = [
  pageType,
  eventType,
  teamMemberType,
  sponsorType,
  projectType,
  blockContentType,
];
