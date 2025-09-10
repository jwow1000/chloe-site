// get tag from url, get post details
import { client } from "@/sanity/client";
import Link from "next/link";
import { GalleryImage } from "@/app/types/localTypes";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { PortableText } from "next-sanity";
import { Post } from "@/app/types/sanity.types";
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
  params: Promise<{ slug: string }>;
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

  // console.log("the data: ", theWork);
  // picture sanity stuff for main image
  // const img = theWork.mainImage ? urlFor(theWork.mainImage)?.url() : null;

  const images: GalleryImage[] =
    theWork.gallery?.map((item) => ({
      src: item.asset?._ref ? urlFor(item.asset._ref)?.url() ?? null : null,
      width: 240,
      height: 240,
      alt: item.altText ? item.altText : null,
    })) || [];

  // render title, dates, description, image, and video
  return (
    <main className={pageStyles.main}>
      <div className={styles.bigWrapper}>
        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{theWork.title}</h1>
          {theWork.exhibitionDetails && (
            <div className={styles.bodyWrapper}>
              <PortableText value={theWork.exhibitionDetails} />
            </div>
          )}
          <Link href={"/works"} className={styles.link}> 
            {"<-- back to works"}
          </Link>
          
          
        </div>
        <div className={styles.mediaWrapper}>
          
        {images && images.length > 0 && (
          <div className={styles.galleryWrapper}>
            <Gallery images={images} buttons={true} />
          </div>
        )}
        
        {workData.videoLink && (
          <div className={styles.vimeoWrapper}>
            <VimeoEmbed url={workData.videoLink} />
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
