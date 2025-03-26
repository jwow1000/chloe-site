import Link from "next/link";
import styles from "@/app/ui/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <p>all content ©Chloë Engel 2025</p>
      <Link 
        className={styles.link}
        href="https://www.jeremywy.com/" 
        target="_blank"
        rel="norefferer noopener"
      >website: Jeremy Wiles-Young</Link>
    </footer>
  )
}