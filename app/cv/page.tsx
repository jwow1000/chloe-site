// get tag from url, get post details
import { defineQuery } from "next-sanity";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import styles from "@/app/ui/page.module.css"

const CV_QUERY = defineQuery(`
  *[_type == "cv"][0]
`);

export default async function Cv() {
  // fetch a rich text cv field from sanity
  const { data: cvData } = await sanityFetch({ query: CV_QUERY });
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Chloe Engel CV</h1>
      <div className={styles.cvBodyWrapper}>
        <PortableText value={cvData.body}/> 
      </div>
    </div>
  );
}