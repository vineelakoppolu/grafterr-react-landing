export default function FloatingShape({ shape }) {
  if (shape.variant === 'image') {
    return (
      <img
        src={shape.image}
        alt=""
        aria-hidden
        className={`floating-shape ${shape.position}`}
      />
    )
  }

  return <span aria-hidden className={`floating-shape ${shape.position} ${shape.variant}`} />
}
