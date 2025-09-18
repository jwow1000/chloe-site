import { Metadata } from "next";
import WorkDetail from "@/app/components/WorkDetail";
import { getWorks } from "@/sanity/fetch";
import { Post } from "@/app/types/sanity.types";
import styles from "@/app/ui/work.module.css";

export const metadata: Metadata = {
  title: "Chloë Engel Works",
  description: "An archive of performance and art works by Chloe Engel, Including Rubber, The Organ, famousley you squeeze me",
};


export default async function Works() {
  const works: Post[] = await getWorks();

  return (
    <main className={styles.main}>
      <div className={styles.worksWrapper}>
        {
          works.map((work) => (
            <div 
              className={styles.workDetailWrapper}
              key={`works-${work.title}`}
            >
              <WorkDetail 
                theWork={work}
              />
            </div>
          ))
        } 

      </div>
    </main>
  );
}