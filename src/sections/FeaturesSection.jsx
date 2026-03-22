import Carousel from '../components/ui/Carousel'
import FloatingShape from '../components/ui/FloatingShape'

export default function FeaturesSection({ content, carouselConfig }) {
  return (
    <section className="features-section">
      <div className="feature-title-row">
        {content.decorativeShapes.map((shape) => (
          <FloatingShape key={shape.id} shape={shape} />
        ))}
        <h2 className="features-title">
          {content.title} <span className="features-title-accent">{content.titleAccent}</span>{' '}
          {content.titleSuffix}
        </h2>
      </div>
      <p className="features-subtitle">{content.subtitle}</p>
      <div className="features-divider-wrap">
        <img src={content.dividerImage} alt="" className="features-divider" />
      </div>
      <Carousel products={content.products} config={carouselConfig} />
    </section>
  )
}
