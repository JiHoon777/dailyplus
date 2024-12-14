'use client'
import type { EmblaOptionsType } from 'embla-carousel'

import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { useRef } from 'react'

export const AutoPlayCarousel = <T,>({
  slides,
  options,
  children,
}: {
  slides: T[]
  options?: EmblaOptionsType
  children: (item: T, index: number) => React.ReactNode
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ])
  const isAutoPlayingRef = useRef(true)

  const autoPlay = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll || isAutoPlayingRef.current) {
      return
    }

    autoScroll.play()
    isAutoPlayingRef.current = true
  }
  const stopAutoPlay = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll || isAutoPlayingRef.current) {
      return
    }

    autoScroll.stop()
    isAutoPlayingRef.current = false
  }

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide"
              key={index}
              onMouseEnter={stopAutoPlay}
              onMouseLeave={autoPlay}
            >
              {children(slide, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
