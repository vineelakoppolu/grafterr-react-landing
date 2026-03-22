import { useCarousel } from '../../hooks/useCarousel'
import ProductCard from './ProductCard'

function getViewportClass(itemsPerView) {
  if (itemsPerView === 1) return 'carousel-mobile'
  if (itemsPerView === 2) return 'carousel-tablet'
  return 'carousel-desktop'
}

export default function Carousel({ products, config }) {
  const {
    containerRef,
    itemsPerView,
    canPrev,
    canNext,
    next,
    prev,
    onTouchStart,
    onTouchEnd,
  } = useCarousel(products.length, config.itemsPerView)

  return (
    <div className="carousel-wrap">
      <div
        ref={containerRef}
        className={`carousel-track ${getViewportClass(itemsPerView)}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {config.showArrows ? (
        <div className="carousel-nav">
          <button
            type="button"
            className="nav-btn"
            aria-label="Previous"
            onClick={prev}
            disabled={!canPrev}
          >
            <img src={config.arrowIcons.prev} alt="" />
          </button>
          <button
            type="button"
            className="nav-btn"
            aria-label="Next"
            onClick={next}
            disabled={!canNext}
          >
            <img src={config.arrowIcons.next} alt="" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
