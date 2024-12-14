'use client'
import type { EmblaOptionsType } from 'embla-carousel'

import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'

const DEFAULT_OPTIONS: EmblaOptionsType = {
  align: 'start',
  loop: true,
}

export const AutoPlayCarousel = <T,>({
  slides,
  options,
  children,
}: {
  slides: T[]
  options?: EmblaOptionsType
  children: (item: T, index: number) => React.ReactNode
}) => {
  const [emblaRef] = useEmblaCarousel({ ...DEFAULT_OPTIONS, ...options }, [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {children(slide, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
