import Link from "next/link";
// import Image from "next/image";
import { Metadata } from "next";
import { getWorks } from "@/sanity/fetch";
import { Post } from "@/app/types/sanity.types";
import { readableDate } from "../helpers/conversions";
import styles from "@/app/ui/page.module.css";

export const metadata: Metadata = {
  title: "Chloë Engel Works",
  description: "An archive of performance and art works by Chloe Engel, Including Rubber, The Organ, famousley you squeeze me",
};

export default async function Works() {
  const posts: Post[] = await getWorks();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.postList}>
        {
          posts.map((post) => {
            
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
                  
                </Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  );
}