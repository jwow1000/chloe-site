import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { Homepage, Calendar, Post } from "./types/types";
import styles from "@/app/ui/page.module.css";


const HOME_QUERY = defineQuery(`
  *[_type == "homepage"][0]
`);

const CALENDAR_QUERY = defineQuery(`
  *[_type == "calendar"]
`);
const WORKS_QUERY = defineQuery(`
  *[_type == "post"]
`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// fetch the data for the homepage, current image and current text
// fetch the calendar data

export default async function Home() {
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const homeInfo: Homepage = home;
  const { data: calendarInfo } = await sanityFetch({ query: CALENDAR_QUERY });
  const calendarArray: Calendar[] = calendarInfo;
  const homeImgAlt = homeInfo.altText ? homeInfo.altText : "#";
  const imgUrl = homeInfo.coverImage
    ? urlFor(homeInfo.coverImage)?.url()
    : null;
  // get works( posts )
  const { data: works } = await sanityFetch({ query: WORKS_QUERY });
  const worksInfo: Post[] = works;
  console.log("the works: ", works)
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chloë Engel</h1>
      <p>{homeInfo.coverText}</p>
      <section className={styles.content}>

        <div className={styles.coverImage}>
          <Image
            src={imgUrl || "https://placehold.co/550x310/png"}
            alt={homeImgAlt}
            className={styles.containImage}
            height="310"
            width="550" 
          />
        </div>
        <div className={styles.worksLinksWrapper}>
          {
            worksInfo &&
              worksInfo.map((work) => (
                <Link
                  className={styles.workLink} 
                  href={`/works/${work.slug?.current}`}
                  key={`works-${work.title}`}
                >
                  {work.title}
                </Link>
              ))
          }
        </div>
        <div className={styles.calendarWrapper}>
          <h2 className={styles.calendarTitle}>Calendar/ Upcoming Events</h2>   
          <ul className={styles.calendarList}>
            {
              calendarArray.map((calItem) => {
                return (
                  <li className={styles.calendarListItem} key={`calendar item: ${calItem.title}`}>
                    {calItem.dateRange?.from}
                    {
                      calItem.dateRange?.to && 
                      ` > ${calItem.dateRange.to}`
                    }
                    { calItem.title && ` ~ ${calItem.title}` }
                    { calItem.location && ` ~ ${calItem.location}` }
                    
                    {
                      calItem.externalLink?.url &&
                        <Link 
                          href={calItem.externalLink.url} 
                          className={styles.calLinks}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {` ~ ${calItem.externalLink.title}`}
                        </Link>
    
                    }
    
                  </li>
                )}

              ) 
            }
          </ul>
        </div>
      </section>
    </main>
  );
}