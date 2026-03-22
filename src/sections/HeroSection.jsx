import GradientButton from '../components/ui/GradientButton'
import GradientText from '../components/ui/GradientText'
import FloatingShape from '../components/ui/FloatingShape'

export default function HeroSection({ content }) {
  return (
    <section className="hero-section">
      <div className="hero-shapes" aria-hidden>
        {content.decorativeShapes.map((shape) => (
          <FloatingShape key={shape.id} shape={shape} />
        ))}
      </div>
      <h1 className="hero-title">
        <span className="hero-prefix">{content.headlinePrefix}</span>
        <GradientText text={content.headlineGradient} tone="hero" />
      </h1>
      <p className="hero-subtitle">
        {content.subheadlineBefore}
        <strong className="hero-subtitle-emphasis">{content.subheadlineEmphasis}</strong>
        {content.subheadlineAfter}
      </p>
      <GradientButton label={content.cta.label} href={content.cta.href} />
    </section>
  )
}
