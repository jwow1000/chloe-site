"use client";
import Link from "next/link";
import styles from "@/app/ui/nav.module.css";

export default function Nav() {


  return (
    <nav className={styles.navWrapper}>
      
         
      <menu className={styles.menuWrapper}>
        <ul className={`${styles.linksWrapper} ${styles.blue}`}>
          <Link 
            href={`/`} 
            title="home" 
            className={`${styles.navLink} ${styles.blue}`} 
          >
          </Link>
          <Link 
            href={`/works`} 
            title="works" 
            className={`${styles.navLink} ${styles.orange}`} 
          >
          </Link>
          <Link 
            href={`/cv`} 
            title="cv" 
            className={`${styles.navLink} ${styles.yellow}`} 
          >
          </Link>
        </ul>
      </menu>

    </nav>
  );
}
