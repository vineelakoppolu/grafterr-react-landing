import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const GAP = 35
const SLIDE_DURATION_MS = 300

export function useCarousel(totalItems, itemsPerViewConfig) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const touchStartX = useRef(0)
  const [index, setIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(itemsPerViewConfig.desktop ?? 3)

  const resolveItemsPerView = useCallback(() => {
    const width = window.innerWidth
    if (width < 768) return itemsPerViewConfig.mobile ?? 1
    if (width < 1200) return itemsPerViewConfig.tablet ?? 2
    return itemsPerViewConfig.desktop ?? 3
  }, [itemsPerViewConfig])

  const maxIndex = useMemo(
    () => Math.max(totalItems - itemsPerView, 0),
    [itemsPerView, totalItems],
  )

  const syncBreakpoint = useCallback(() => {
    setItemsPerView(resolveItemsPerView())
  }, [resolveItemsPerView])

  useEffect(() => {
    syncBreakpoint()
    window.addEventListener('resize', syncBreakpoint)
    return () => window.removeEventListener('resize', syncBreakpoint)
  }, [syncBreakpoint])

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  const getStepWidth = useCallback(() => {
    const el = containerRef.current
    if (!el) return 0
    const firstCard = el.querySelector('[data-card]')
    if (!firstCard) return 0
    return firstCard.getBoundingClientRect().width + GAP
  }, [])

  const animateTo = useCallback((targetLeft) => {
    const el = containerRef.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const from = el.scrollLeft
    const distance = targetLeft - from
    const startedAt = performance.now()

    const frame = (time) => {
      const t = Math.min((time - startedAt) / SLIDE_DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      el.scrollLeft = from + distance * eased
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame)
      }
    }

    rafRef.current = requestAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const step = getStepWidth()
    if (step > 0) animateTo(index * step)
  }, [animateTo, getStepWidth, index, itemsPerView])

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  const next = useCallback(() => {
    setIndex((current) => Math.min(current + 1, maxIndex))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((current) => Math.max(current - 1, 0))
  }, [])

  const onTouchStart = useCallback((event) => {
    touchStartX.current = event.changedTouches[0].clientX
  }, [])

  const onTouchEnd = useCallback(
    (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(deltaX) < 40) return
      if (deltaX < 0) next()
      if (deltaX > 0) prev()
    },
    [next, prev],
  )

  return {
    containerRef,
    index,
    itemsPerView,
    canPrev: index > 0,
    canNext: index < maxIndex,
    next,
    prev,
    onTouchStart,
    onTouchEnd,
  }
}
