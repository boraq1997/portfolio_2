import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer: IntersectionObserver

  function observe() {
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    // انتظر حتى يتم render كل الـ components
    setTimeout(() => observe(), 300)
  })

  onUnmounted(() => observer?.disconnect())
}