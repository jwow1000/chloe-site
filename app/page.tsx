import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getHomepage, getCv, getWorks } from "@/sanity/fetch";
import { client } from "@/sanity/client";
import { Homepage, Post } from "@/app/types/sanity.types";
import { portableTextComponents } from "@/app/components/portableTextComponents";

// image setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function Home() {
  // home data
  const home: Homepage = await getHomepage();
  const cv: { fileUrl: string | null } = await getCv();
  const works: Post[] = await getWorks();

  const imageUrl = home.image?.asset ? urlFor(home.image.asset)?.url() : null;

  return (
    <main className="flex flex-row items-center min-h-screen max-w-[1000px] mx-auto">
      <div className="w-1/2 flex flex-col items-start justify-start text-left gap-3">
        <h1 className="text-[14px] font-normal mb-2">Chloë Engel</h1>
        <a
          className="text-fg no-underline hover:text-brand-pink text-[12px]"
          href="mailto:chlochloengel@gmail.com"
        >
          chlochloengel@gmail.com
        </a>
        {cv?.fileUrl && (
          <a
            className="text-fg underline hover:text-brand-pink"
            href={cv.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        )}
        {works && works.length > 0 && (
          <div className="relative flex flex-col justify-center items-start w-full mt-8">
            {works.map((work) => (
              <Link
                key={work._id}
                href={`/works/${work.slug?.current}`}
                className="text-fg my-[0.3rem] text-left no-underline flex flex-col hover:text-brand-pink sm:w-[13rem] md:w-auto"
              >
                <span className="text-[12px]">{work.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/2 flex flex-col items-center gap-8">
        {imageUrl && (
          <Image
            className="w-full h-auto max-w-[32rem] object-cover"
            src={imageUrl}
            alt={home.image?.altText || ""}
            width={1600}
            height={1000}
          />
        )}
        <div className="text-fg text-[12px] text-justify w-fit max-w-[300px] inline-block [&_p]:mb-8">
          {
            home.bio &&
            <PortableText value={home.bio} components={portableTextComponents} />
          }
        </div>
      </div>
    </main>
  );
}
