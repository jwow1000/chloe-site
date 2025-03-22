import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { DateDisplay } from "./helpers/conversions";
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
const LATEST_WORK_QUERY = defineQuery(`
  *[_type == "post"]
   |order(exhibitionDetails[0].dateRange.from desc)
  [0]
`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// fetch the data for the homepage, current image and current text
// fetch the calendar data

export default async function Home() {
  // home data
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const homeInfo: Homepage = home;
  
  // calendar items
  const { data: calendarInfo } = await sanityFetch({ query: CALENDAR_QUERY });
  const calendarArray: Calendar[] = calendarInfo;
  
  // extract home image
  const homeImgAlt = homeInfo.altText ? homeInfo.altText : "#";
  const imgUrl = homeInfo.coverImage
    ? urlFor(homeInfo.coverImage)?.url()
    : null;
  
  // get latest work( posts )
  const { data: work } = await sanityFetch({ query: LATEST_WORK_QUERY });
  const workInfo: Post = work;
  const workImgAlt = workInfo.mainImage?.asset?._ref ? workInfo.mainImage?.asset?._ref : "#";
  const workImgUrl = workInfo.mainImage?.asset?._ref 
    ? urlFor(workInfo.mainImage?.asset?._ref)?.url() 
    : null;


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chloë Engel</h1>
      <p className={styles.coverText}>{homeInfo.coverText}</p>
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
          <div className={styles.worksLinksTitle}>recent works</div>
          {
            workInfo &&
              <Link
                className={styles.workLink} 
                href={`/works/${workInfo.slug?.current}`}
                key={`works-${work.title}`}
              >
                <div>
                  {` ~ `}
                  <span className={styles.workTitle}>{ workInfo.title && `${workInfo.title} `}</span> {` ~ `}
                  <span className={styles.workDate}>{ workInfo?.exhibitionDetails?.[0]?.dateRange?.from && `${workInfo?.exhibitionDetails[0].dateRange.from}`} </span>
                </div>
                <Image 
                  src={workImgUrl || "https://placehold.co/550x310/png"}
                  alt={workImgAlt}
                  className={styles.containImage}
                  height="310"
                  width="550" 
                />
              </Link>
          }
        </div>
        <div className={styles.calendarWrapper}>
          <h2 className={styles.calendarTitle}>Calendar/ Upcoming Events</h2>   
          <ul className={styles.calendarList}>
            {
              calendarArray.map((calItem) => {
                return (
                  <li className={styles.calendarListItem} key={`calendar item: ${calItem.title}`}>
                    {<DateDisplay date={calItem.dateRange?.from} />}
                    {
                      calItem.dateRange?.to &&
                          <DateDisplay date={calItem.dateRange?.to} />
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