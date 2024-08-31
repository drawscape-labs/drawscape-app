import confetti from 'canvas-confetti'

export const fireBasicConfetti = () => {
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 1, x: 0 },
  })
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 1, x: 1 },
  })
}