// import Link from "next/link";
import { PortableText } from "@portabletext/react";
// import { DateDisplay } from "./helpers/conversions";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
// import { Homepage, Calendar, Post } from "./types/types";
import { Homepage } from "@/app/types/sanity.types";
import styles from "@/app/ui/page.module.css";


const HOME_QUERY = defineQuery(`
  *[_type == "homepage"][0]
`);

// const CALENDAR_QUERY = defineQuery(`
//   *[_type == "calendar"]
// `);
// const LATEST_WORK_QUERY = defineQuery(`
//   *[_type == "post"]
//    |order(exhibitionDetails[0].dateRange.from desc)
//   [0]
// `);

// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

// fetch the data for the homepage, current image and current text
// fetch the calendar data

export default async function Home() {
  // home data
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const homeInfo: Homepage = home;

  console.log("home info: ", homeInfo)
  

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chloë Engel</h1>
      <div className={styles.coverText}>
        {
          homeInfo.coverText &&
          <PortableText value={homeInfo.coverText} />
        }
      </div>
    </main>
  );
}