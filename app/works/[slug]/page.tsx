// get tag from url, get post details
import { Post } from "@/app/types/types";
import { client } from "@/sanity/client";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { PortableText } from "next-sanity";
import { DateDisplay } from "@/app/helpers/conversions";
import VimeoEmbed from "@/app/components/vimeoEmbed";
import styles from "@/app/ui/work.module.css";
import pageStyles from "@/app/ui/page.module.css";

const WORK_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]
`);

interface DetailWorksProps {
  params: {
    slug: string;
  };
}

// image setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// export default async function DetailWorks({ params }: DetailWorksProps) {
export default async function DetailWorks({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  if (!params) {
    return <div>Work not found</div>;
  }
  const slug = (await params).slug;
  // Fetch the work data using the slug
  const { data: workData } = await sanityFetch<string>({
    query: WORK_QUERY,
    params: { slug }, // Pass slug to the query
  });
  const theWork: Post = workData;

  if (!theWork) {
    return <div>Work not found</div>;
  }

  console.log("the data: ", theWork)
  // picture sanity stuff
  const img = theWork.mainImage
            ? urlFor(theWork.mainImage)?.url()
            : null;
  // render title, dates, description, image, and video
  return (
    <main className={pageStyles.main}>
      <h1 className={pageStyles.title}>{theWork.title}</h1>
      
      {
        theWork.mainImage &&
          <div className={styles.imageWrapper}>
            <Image
              src={img || "https://placehold.co/550x310/png"}
              alt={theWork.title || "Post"}
              className={styles.containImage}
              height="310"
              width="550" 
            />
          </div>
      }

      {
        theWork.body &&
          <div className={styles.bodyWrapper}>
            <PortableText value={workData.body}/>
          </div>
      }
      {
        workData.videoLink &&
          <div className={styles.vimeoWrapper}>
            <VimeoEmbed
              url={workData.videoLink}
            />
          </div>
      }
      {
        workData.exhibitionDetails &&
          <ul className={styles.exDetailsWrapper} >
            Work Exhibited:
            {
              workData.exhibitionDetails.map((deet) => (
                <li className={styles.deetWraper} key={`deets-${deet.dateRange.from}`}>
                  <h3>{deet.exhibitionName}</h3>
                  <p className={style.}><DateDisplay date={deet.dateRange.from}/></p>
                  {
                    deet.dateRange.to &&
                      <p><DateDisplay date={deet.dateRange.from}/></p>
                  }
                </li>
              ))
            }
          </ul>
      } 
      

    </main>
  );
}