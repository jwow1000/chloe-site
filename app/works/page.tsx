import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { getWorks } from "@/sanity/fetch";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { Post } from "@/app/types/sanity.types";
import { readableDate } from "../helpers/conversions";
import styles from "@/app/ui/page.module.css";

export const metadata: Metadata = {
  title: "Chloë Engel Works",
  description: "An archive of performance and art works by Chloe Engel, Including Rubber, The Organ, famousley you squeeze me",
};




// image setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;


export default async function Works() {
  const posts: Post[] = await getWorks();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.postList}>
        {
          posts.map((post) => {
            const img = post.mainImage
            ? urlFor(post.mainImage)?.url()
            : null;
            // console.log("imagds", img)
            return (
              <li className={styles.postList} key={post._id}>
                <Link 
                  className={styles.postLink}
                  href={`/works/${post.slug?.current}`}
                >
                  <h2>{post.title}</h2>
                  {
                    post.workDate &&
                      <h6>{readableDate(post.workDate, 1)}</h6>
                  }
                  <div className={styles.previewImageWrapper}>
                    <Image
                      src={img || "https://placehold.co/550x310/png"}
                      alt={post.title || "Post"}
                      className={styles.containImage}
                      height="310"
                      width="550" 
                    />
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  );
}