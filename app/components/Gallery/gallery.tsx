"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/app/types/localTypes";
import placeholder from "@/public/file.svg";
import styles from "./gallery.module.css";


export default function Gallery({ images, buttons }: { images: GalleryImage[], buttons: boolean }) {
  const [index, setIndex] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    setSize(images.length);
  },[]);

  // click handle
  const handleClick = (up: boolean) => {
    if( up ) {
      setIndex((prev) => (prev+1) > size-1 ? 0 : prev+1);
    } else {
      setIndex((prev) => (prev-1) < 0 ? size-1 : prev-1);
    }
  }

  return (
    <div >
      <div className={styles.galleryWrapper}>
        <div 
          className={styles.leftField} 
          onClick={() => handleClick(false)}
        ></div>
        <div 
          className={styles.rightField}
          onClick={() => handleClick(true)}
        ></div>
        {
          images.length > 0 && (
            <div className={styles.wrapper}>
              <div className={styles.itemWrapper}>
                <Image
                  className={styles.item}
                  src={images[index].src || placeholder}
                  alt={images[index].alt || "no image description"}
                  width={images[index].width}
                  height={images[index].height}
                />
              </div>
            </div>
          )
        }
        
        {
          buttons &&
            <div className={styles.buttonsWrapper}>
              <button className={styles.leftButton}>{'<'}</button>
              <button className={styles.rightButton}>{'>'}</button>
            </div>

        }
      </div>
    </div>
  )
}
