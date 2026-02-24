import { defineQuery } from "next-sanity";

// Pages
export const PAGE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    _id, title, slug, body, mainImage, seoDescription
  }`
);

// Events
export const ALL_EVENTS_QUERY = defineQuery(
  `*[_type == "event"] | order(date desc){
    _id, title, slug, date, endDate, location, description, image,
    "project": project->{title, slug}
  }`
);

export const UPCOMING_EVENTS_QUERY = defineQuery(
  `*[_type == "event" && date >= now()] | order(date asc){
    _id, title, slug, date, endDate, location, description, image,
    "project": project->{title, slug}
  }`
);

export const EVENT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "event" && slug.current == $slug][0]{
    _id, title, slug, date, endDate, location, body, image,
    "project": project->{title, slug}
  }`
);

// Team
export const ALL_TEAM_MEMBERS_QUERY = defineQuery(
  `*[_type == "teamMember"] | order(order asc){
    _id, name, role, bio, photo, email
  }`
);

// Sponsors
export const ALL_SPONSORS_QUERY = defineQuery(
  `*[_type == "sponsor"] | order(order asc){
    _id, name, logo, website, tier
  }`
);

// Projects
export const ALL_PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc){
    _id, title, slug, description, mainImage, category, isActive
  }`
);

export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id, title, slug, body, mainImage, category, isActive, externalUrl
  }`
);
