import { PortableText } from "@portabletext/react";
import { getHomepage } from "@/sanity/fetch";
import { Homepage } from "@/app/types/sanity.types";
import styles from "@/app/ui/page.module.css";




export default async function Home() {
  // home data
  // const { data: home } = await sanityFetch(HOME_QUERY);
  const home: Homepage = await getHomepage();

  

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chloë Engel</h1>
      <div className={styles.coverText}>
        {
          home.coverText &&
          <PortableText value={home.coverText} />
        }
      </div>
    </main>
  );
}