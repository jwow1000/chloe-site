import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  getHomepage,
  getCv,
  getWorks,
  getFeaturedCalendarEntry,
} from "@/sanity/fetch";
import { client } from "@/sanity/client";
import { Homepage, Post, Calendar } from "@/app/types/sanity.types";
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
  const calendarEntry: Calendar | null = await getFeaturedCalendarEntry();

  const imageUrl = home.image?.asset ? urlFor(home.image.asset)?.url() : null;

  return (
    <main className="flex flex-col md:gap-8 md:flex-row p-2 md:py-12 justify-center items-start md:flex-wrap md:content-center md:items-stretch min-h-screen md:h-dvh md:min-h-0 max-w-[1000px] mx-auto mb-20 md:mb-0">
      <div className="w-full md:w-1/3 md:max-h-[calc(100dvh-6rem)] md:overflow-y-auto flex flex-col items-start justify-start text-left pt-12 md:pt-0">
        <h1 className="text-[14px] font-normal m-0">Chloë Engel</h1>
        <a
          className="text-fg no-underline hover:text-brand-pink text-[12px]"
          href="mailto:chlochloengel@gmail.com"
        >
          chlochloengel@gmail.com
        </a>
        {cv?.fileUrl && (
          <a
            className="text-fg text-[12px] underline hover:text-brand-pink"
            href={cv.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            download CV
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
      <div className="relative w-full md:w-1/3 flex flex-col items-start md:items-center gap-8">
          {imageUrl && (
            <Image
              className="w-full h-auto max-w-[32rem] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-auto md:max-h-dvh"
              src={imageUrl}
              alt={home.image?.altText || ""}
              width={600}
              height={500}
            />
          )}
        <div className="w-full flex flex-col md:h-full p-8">
          <div className="relative w-full md:flex-1 md:min-h-0">
            <div className="text-fg text-[12px] text-justify w-fit max-w-[45ch] inline-block [&_p]:mb-8 md:absolute md:top-0 md:left-0 md:z-10 md:bg-bg md:pr-3 md:pb-3 md:[&_p:last-child]:mb-0 p-1">
              {home.bio && (
                <PortableText
                  value={home.bio}
                  components={portableTextComponents}
                />
              )}
            </div>
          </div>
          {calendarEntry?.body && (
            <div className="text-fg bg-bg z-10 text-[12px] italic w-full inline-block my-6 md:mb-0 ">
              <PortableText
                value={calendarEntry.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
