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
  console.log("lol", cv);
  return (
    <main className="flex flex-col md:gap-8 md:flex-row pt-44 justify-center items-start min-h-screen max-w-[1000px] mx-auto p-2 mb-20 md:mb-0">
      <div className="w-full md:w-1/3 flex flex-col items-start justify-start text-left pt-12 md:pt-0">
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
      <div className="w-full md:w-1/3 flex flex-col items-start md:items-center gap-8">
        <div className="w-full flex flex-col">
          <div className="text-fg text-[12px] text-justify w-fit max-w-[45ch] inline-block [&_p]:mb-8">
            {home.bio && (
              <PortableText
                value={home.bio}
                components={portableTextComponents}
              />
            )}
          </div>

          {imageUrl && (
            <Image
              className="w-full h-auto max-w-[32rem] object-cover"
              src={imageUrl}
              alt={home.image?.altText || ""}
              width={1600}
              height={1000}
            />
          )}
          {calendarEntry?.body && (
            <div className="text-fg text-[12px] italic w-full inline-block my-6">
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
