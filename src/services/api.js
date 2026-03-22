import content from '../data/content.json'

function withDelay(payload) {
  const delay = 1000 + Math.floor(Math.random() * 501)
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(payload)), delay)
  })
}


// function withDelay(payload, shouldFail = false) {
//   const delay = 1500

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldFail) {
//         reject(new Error("API failed"))
//       } else {
//         resolve(structuredClone(payload))
//       }
//     }, delay)
//   })
// }

export function fetchHeroContent() {
  return withDelay(content.hero)
}

export function fetchFeaturesContent() {
  return withDelay({
    featuresSection: content.featuresSection,
    carousel: content.carousel,
    ui: content.ui,
  })
}
