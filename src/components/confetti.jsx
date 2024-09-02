import confetti from 'canvas-confetti'

export const fireBasicConfetti = () => {
  confetti({
    particleCount: 400,
    spread: 200,
    origin: { y: .1, x: 0 },
  })
  confetti({
    particleCount: 400,
    spread: 200,
    origin: { y: .1, x: 1 },
  })
}