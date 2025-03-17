'use client';
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmbalaCarouselDotButton'
import Image from 'next/image';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmbalaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './embala.module.css';

type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
}
type PropType = {
  slides: Image[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className={styles.embala}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((item,index) => (
            <div className={styles.embla__slide} key={`image-${index}`}>
              <div className={styles.embla__slide__number}>
                <Image
                  className={styles.item}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles.embla__dotSelected : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
