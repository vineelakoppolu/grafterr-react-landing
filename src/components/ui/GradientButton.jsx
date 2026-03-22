export default function GradientButton({ label, href = '#', onClick, className = '' }) {
  return (
    <a href={href} className={`gradient-button ${className}`.trim()} onClick={onClick}>
      {label}
    </a>
  )
}
