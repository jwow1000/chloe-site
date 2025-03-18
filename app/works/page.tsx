import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { Post } from "../types/types";
import styles from "@/app/ui/page.module.css";

const POSTS_QUERY = defineQuery(`
  *[_type == "post"]
  |order(date desc)
`);

// image setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;


export default async function Works() {
  const { data: postData } = await sanityFetch({ query: POSTS_QUERY });
  const posts: Post[] = postData;

  console.log("data: ", posts );
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
                  <h5>{ post.exhibitionDetails?.[0]?.dateRange?.from && `${post.exhibitionDetails[0].dateRange.from}`}</h5>
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