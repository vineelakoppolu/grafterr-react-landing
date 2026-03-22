import { useCallback, useEffect, useState } from 'react'
import { fetchFeaturesContent, fetchHeroContent } from '../services/api'
import content from '../data/content.json'

export function useContent() {
  const [hero, setHero] = useState(null)
  const [featuresSection, setFeaturesSection] = useState(null)
  const [carousel, setCarousel] = useState(null)
  const [ui, setUi] = useState(content.ui)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [heroData, featurePayload] = await Promise.all([
        fetchHeroContent(),
        fetchFeaturesContent(),
      ])
      setHero(heroData)
      setFeaturesSection(featurePayload.featuresSection)
      setCarousel(featurePayload.carousel)
      setUi(featurePayload.ui)
    } catch {
      setError(content.ui.errorFallbackMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { hero, featuresSection, carousel, ui, loading, error, retry: load }
}
