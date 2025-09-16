// get tag from url, get post details
import styles from "@/app/ui/page.module.css"



export default async function Cv() {
   
  return (
    <div className={styles.fullMain}>
      <div className={styles.cvBodyWrapper}>
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vTMbbZC3qcOjJEuKU2VDYHUHioFV51KNcTIoPhlX0uJrJO_Dal_oFvQCDwmXi07oQ/pub?embedded=true"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Chloe Engel CV"
        />
      </div>
    </div>
  );
}