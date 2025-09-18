// get tag from url, get post details
import { client } from "@/sanity/client";
import { GalleryImage } from "@/app/types/localTypes";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";
import { Post } from "@/app/types/sanity.types";
import Gallery from "@/app/components/Gallery/gallery";
import VimeoEmbed from "@/app/components/vimeoEmbed";
import styles from "@/app/ui/work.module.css";

// image setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// export default async function DetailWorks({ work }: DetailWorksProps) {
export default async function WorkDetail({ theWork }: { theWork: Post }) {
  if (!theWork) {
    return <div>Work not found</div>;
  }

  const images: GalleryImage[] =
    theWork.gallery?.map((item) => ({
      src: item.asset?._ref ? urlFor(item.asset._ref)?.url() ?? null : null,
      width: 240,
      height: 240,
      alt: item.altText ? item.altText : null,
    })) || [];

  // render title, dates, description, image, and video
  return (
    <div className={styles.bigWrapper}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{theWork.title}</h1>
        {theWork.exhibitionDetails && (
          <div className={styles.bodyWrapper}>
            <PortableText value={theWork.exhibitionDetails} />
          </div>
        )}
      </div>
      <div className={styles.mediaWrapper}>
        {images && images.length > 0 && (
          <div className={styles.galleryWrapper}>
            <Gallery images={images} buttons={true} />
          </div>
        )}
        {theWork.videoLink && (
          <div className={styles.vimeoWrapper}>
            <VimeoEmbed url={theWork.videoLink} />
          </div>
        )}
      </div>
    </div>
  );
}
