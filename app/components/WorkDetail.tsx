// get tag from url, get post details
import { client } from "@/sanity/client";
import { GalleryImage } from "@/app/types/localTypes";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";
import { Post } from "@/app/types/sanity.types";
import Gallery from "@/app/components/Gallery/gallery";
import VideoEmbed from "@/app/components/VideoEmbed";
import { portableTextComponents } from "@/app/components/portableTextComponents";
import Image from "next/image";
import Link from "next/link";

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
    theWork.gallery
      ?.filter((item) => item.asset)
      .map((item) => ({
        src: urlFor(item.asset!)!.url(),
        width: 800,
        height: 800,
        alt: item.altText || null,
      })) || [];

  // render title, dates, description, image, and video
  return (
    <div className="w-full max-w-[1000px] mx-auto pb-24 flex flex-row flex-wrap">
      <div className="w-1/2 pr-12 flex flex-col justify-center">
        <Link href="/" aria-label="Return home" className="inline-block w-14 mb-14">
          <Image
            src="/hand.svg"
            alt="Return home"
            width={127}
            height={147}
            className="w-full h-auto"
          />
        </Link>
        <h1 className="text-xl mb-8 font-bold">{theWork.title}</h1>
        {theWork.exhibitionDetails && (
          <div className="flex flex-col gap-4 list-none w-full text-[12px] leading-normal">
            <PortableText value={theWork.exhibitionDetails} components={portableTextComponents} />
          </div>
        )}
      </div>
      {
        images.length > 0 &&
        <div className="w-1/2 flex flex-col gap-8 justify-center">
          <Gallery images={images} />
        </div>
      }
      {
        theWork.videoFileUrl &&
        <div className="w-1/2 flex flex-col gap-8 justify-center">
          { (
            <video
              className="w-full h-auto"
              src={theWork.videoFileUrl}
              controls
              aria-label={theWork.video?.altText || undefined}
            />
          )}
        </div>
      }
      {
        theWork.videoLink &&
        <div className="w-1/2 flex flex-col gap-8 justify-center">
          <VideoEmbed url={theWork.videoLink} />
        </div>
      }
    </div>
  );
}
