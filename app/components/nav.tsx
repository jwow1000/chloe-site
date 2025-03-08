"use client";
import { useState } from "react";
import Link from "next/link";
import RandomLine from "./randomLine";
import styles from "@/app/ui/page.module.css";

export default function Nav() {
  const [lineReDraw, setLineReDraw] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  function handleClick() {
    setLineReDraw((prev) => !prev);
    setDisplayMenu((prev) => !prev);
  }

  return (
    <div className={styles.navWrapper}>
      <div 
        className={styles.randomLineWrapper}
        onClick={handleClick}
      >
        <RandomLine trig={lineReDraw}/>
      </div>
      {
        displayMenu &&
          <nav className={styles.menuWrapper}>
            <ul>
              <Link href={`/works`} className={styles.workLink} >
                collected works
              </Link>
              <Link href={`/bio`} className={styles.workLink} >
                bio
              </Link>
            </ul>
          </nav>
      }

    </div>
  );
}
