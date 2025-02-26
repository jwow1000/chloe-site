import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import styles from "@/app/ui/page.module.css";

const HOME_QUERY = defineQuery(`
  *[_type == "homepage"][0]
`);
const CALENDAR_QUERY = defineQuery(`
  *[_type == "calendar"]
`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// fetch the data for the homepage, current image and current text
// fetch the calendar data

export default async function Home() {
  const { data: homeInfo } = await sanityFetch({ query: HOME_QUERY });
  const { data: calendarInfo } = await sanityFetch({ query: CALENDAR_QUERY });

  console.log("calendar: ", calendarInfo );
  const imgUrl = homeInfo.coverImage
    ? urlFor(homeInfo.coverImage)?.url()
    : null;
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chloë Engel</h1>
      <p>{homeInfo.coverText}</p>
      <div className={styles.coverImage}>
        <Image
          src={imgUrl || "https://placehold.co/550x310/png"}
          alt={homeInfo.altText}
          className={styles.containImage}
          height="310"
          width="550" 
        />
      </div>
      <div className={styles.calendarWrapper}>
        <h2>Calendar/ Upcoming Events</h2>   
        <ul className={styles.calendarList}>
          {
            calendarInfo.map((calItem) => (
            <li className={styles.calendarListItem} key={`calendar item: ${calItem.title}`}>
              {calItem.dateRange.from}~{calItem.dateRange.to}~{calItem.title}~{calItem.location}
              {
                calItem.externalLink &&
                  <Link 
                    href={calItem.externalLink.url} 
                    className={styles.calLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {calItem.externalLink.title}
                  </Link>

              }

            </li>
            ))
          }
        </ul>
      </div>
    </main>
  );
}