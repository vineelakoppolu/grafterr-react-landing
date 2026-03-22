export default function GradientText({ text, tone = 'hero' }) {
  const toneClass = tone === 'feature' ? 'gradient-text-feature' : 'gradient-text-hero'
  return <span className={`gradient-text ${toneClass}`}>{text}</span>
}
