import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function AdvertisingCarousel({ advertisements }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)

  function scrollToIndex(index) {
    const track = trackRef.current
    const slide = track?.children[index]

    if (!track || !slide) {
      return
    }

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })
  }

  function scroll(direction) {
    const nextIndex = (activeIndex + direction + advertisements.length) % advertisements.length
    setActiveIndex(nextIndex)
    scrollToIndex(nextIndex)
  }

  useEffect(() => {
    if (advertisements.length <= 1) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % advertisements.length
        scrollToIndex(nextIndex)
        return nextIndex
      })
    }, 4000)

    return () => window.clearInterval(interval)
  }, [advertisements.length])

  if (advertisements.length === 0) {
    return null
  }

  return (
    <section className="advertising-section section page-container" aria-label="Ưu đãi và quảng cáo">
      <div className="section-heading advertising-heading">
        <div>
          <p className="eyebrow">Nana Xinh cập nhật</p>
          <h2>Ưu đãi đang diễn ra</h2>
        </div>
        {advertisements.length > 1 && (
          <div className="advertising-controls">
            <button type="button" onClick={() => scroll(-1)} aria-label="Quảng cáo trước">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Quảng cáo tiếp theo">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="advertising-track" ref={trackRef}>
        {advertisements.map((advertisement) => {
          const image = (
            <>
              <img src={advertisement.imageUrl} alt={advertisement.title || 'Banner quảng cáo Nana Xinh'} />
              {advertisement.title && <strong>{advertisement.title}</strong>}
            </>
          )

          return advertisement.linkUrl ? (
            <a
              className="advertising-slide"
              href={advertisement.linkUrl}
              key={advertisement.id}
              target="_blank"
              rel="noreferrer"
            >
              {image}
            </a>
          ) : (
            <article className="advertising-slide" key={advertisement.id}>{image}</article>
          )
        })}
      </div>
    </section>
  )
}
