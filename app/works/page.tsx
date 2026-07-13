import { Metadata } from "next";
import Link from "next/link";
import { getWorks } from "@/sanity/fetch";
import { Post } from "@/app/types/sanity.types";

export const metadata: Metadata = {
  title: "Chloë Engel Works",
  description: "An archive of performance and art works by Chloë Engel, Including Rubber, The Organ, famousley you squeeze me",
};

export default async function Works() {
  const works: Post[] = await getWorks();

  return (
    <main className="flex flex-col justify-center gap-4 min-h-[calc(100vh-2rem)] p-[6rem_0_10rem_0] sm:pr-24">
      <ul className="mx-auto w-80 list-none flex flex-col justify-center gap-8">
        {works.map((work) => (
          <li key={work._id}>
            <Link className="text-fg no-underline" href={`/works/${work.slug?.current}`}>
              {work.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
