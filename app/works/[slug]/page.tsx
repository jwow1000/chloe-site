// get tag from url, get post details
import { Post } from "@/app/types/types";
import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { GalleryImage } from "@/app/types/localTypes";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { PortableText } from "next-sanity";
import { DateDisplay } from "@/app/helpers/conversions";
import Gallery from "@/app/components/Gallery/gallery";
import VimeoEmbed from "@/app/components/vimeoEmbed";
import styles from "@/app/ui/work.module.css";
import pageStyles from "@/app/ui/page.module.css";

const WORK_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]
`);

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
  // picture sanity stuff for main image
  const img = theWork.mainImage
            ? urlFor(theWork.mainImage)?.url()
            : null;
  
  const images: GalleryImage[] = theWork.gallery?.map((item) => ({
    src: item.asset?._ref ? urlFor(item.asset._ref)?.url() ?? null : null,
    width: 240,
    height: 240,
    alt: item.altText ? item.altText : null,
  })) || [];
            
  

  // render title, dates, description, image, and video
  return (
    <main className={pageStyles.main}>
      <h1 className={pageStyles.title}>{theWork.title}</h1>
      <Link className={pageStyles.postLink} href={'/works'}>{'<-- back to works'}</Link> 
      {
        theWork.mainImage &&
          <div className={styles.mainImageWrapper}>
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
        images && images.length > 0 &&
        <div className={styles.galleryWrapper}>
          <Gallery images={images} buttons={true}/>
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
      {workData.exhibitionDetails && workData.exhibitionDetails.length > 0 && (
        <ul className={styles.bodyWrapper}>
          <h2 className={styles.deetsTitle}>Work Exhibited:</h2>
          {workData.exhibitionDetails.map((deet: {
            dateRange?: {
              from?: string;
              to?: string;
            };
            location?: {
              venue?: string;
              city?: string;
              country?: string;
            };
            exhibitionName?: string;
            _key: string;
          }, idx: number) => (
            <li className={styles.deetWrapper} key={`deets-${idx}`}>
              <p className={styles.deetBody}>
                {deet.exhibitionName}
                <span className={styles.deetDate}>
                  <DateDisplay date={deet.dateRange?.from || 'null'} />
                </span>
                {deet.dateRange?.to && (
                  <span> - <DateDisplay date={deet.dateRange.to} /></span>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}

      
      

    </main>
  );
}