"use client";
import { useState } from "react";
import Link from "next/link";
import RandomLine from "./randomLine";
import pageStyles from "@/app/ui/page.module.css";
import styles from "@/app/ui/nav.module.css";

export default function Nav() {
  const [lineReDraw, setLineReDraw] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  function handleClick() {
    setLineReDraw((prev) => !prev);
    setDisplayMenu((prev) => !prev);
  }

  return (
    <nav className={styles.navWrapper}>
      <button
        className={styles.randomLineWrapper}
        onClick={handleClick}
      >
        <RandomLine trig={lineReDraw}/>
        <menu className={styles.menuTitle}>
          {
            displayMenu ?
              'menu ▼'
              : 'menu ►'
          }
        </menu>
      </button>
      {
        displayMenu &&
          <menu className={styles.menuWrapper} onClick={handleClick}>
            <ul className={styles.linksWrapper}>
              <Link href={`/`} className={pageStyles.workLink} >
                home
              </Link>
              <Link href={`/works`} className={pageStyles.workLink} >
                works
              </Link>
              <Link href={`/bio`} className={pageStyles.workLink} >
                bio
              </Link>
            </ul>
          </menu>
      }

    </nav>
  );
}
