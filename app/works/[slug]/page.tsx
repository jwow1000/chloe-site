import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { getWork } from "@/sanity/fetch";
import { Post } from "@/app/types/sanity.types";
import WorkDetail from "@/app/components/WorkDetail";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const theWork: Post = await getWork(slug);

  return {
    title: theWork?.title ? `${theWork.title} — Chloë Engel` : "Chloë Engel Works",
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const theWork: Post = await getWork(slug);


  return (
    <main className="flex flex-col justify-center gap-4 min-h-[calc(100vh-2rem)] pt-24">
      <WorkDetail theWork={theWork} />
    </main>
  );
}
