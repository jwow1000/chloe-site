// sanity/fetch.ts
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// A simple helper to fetch data from Sanity
export async function sanityFetch(query: string, params = {}) {
  // Disable cache to always get fresh production data
  return client.fetch(query, params, { cache: 'no-store' });
}

const HOME_QUERY = groq`
  *[_type == "homepage"][0]
`;

export function getHomepage() {
  return sanityFetch(HOME_QUERY);
}

const POSTS_QUERY = groq`
  *[_type == "post"]
  |order(workDate desc)
`;

export function getWorks() {
  return sanityFetch(POSTS_QUERY);
}

const WORK_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]
`;

export function getWork(slug: string) {
  return sanityFetch(WORK_QUERY, {slug: slug})
}