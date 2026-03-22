export default function Skeleton({ variant }) {
  if (variant === 'hero') {
    return (
      <section className="skeleton skeleton-hero">
        <div className="skeleton-line lg" />
        <div className="skeleton-line md" />
        <div className="skeleton-line sm" />
        <div className="skeleton-pill" />
      </section>
    )
  }

  return (
    <section className="skeleton skeleton-features">
      <div className="skeleton-line lg" />
      <div className="skeleton-line md" />
      <div className="skeleton-divider" />
      <div className="skeleton-cards">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    </section>
  )
}
