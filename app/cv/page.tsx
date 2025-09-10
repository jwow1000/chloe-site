// get tag from url, get post details
import styles from "@/app/ui/page.module.css"



export default async function Cv() {
   
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Chloë Engel CV</h1>
      <div className={styles.cvBodyWrapper}>
        <iframe
          src="https://docs.google.com/document/d/your-doc-id/pub?embedded=true"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Chloe Engel CV"
        />
      </div>
    </div>
  );
}