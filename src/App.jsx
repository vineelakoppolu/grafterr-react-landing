import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import Skeleton from './components/ui/Skeleton'
import { useContent } from './hooks/useContent'

function App() {
  const { hero, featuresSection, carousel, ui, loading, error, retry } = useContent()

  if (loading) {
    return (
      <main className="app-shell">
        <Skeleton variant="hero" />
        <Skeleton variant="features" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="app-shell error-state">
        <h2 className="error-title">{ui?.errorTitle ?? ''}</h2>
        <p className="error-message">{error}</p>
        <button type="button" className="gradient-button" onClick={retry}>
          {ui?.errorRetryLabel ?? ''}
        </button>
      </main>
    )
  }

  return (
    <main className="app-shell content-fade-in">
      <HeroSection content={hero} />
      <FeaturesSection content={featuresSection} carouselConfig={carousel} />
    </main>
  )
}

export default App
