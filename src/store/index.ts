import { create } from 'zustand'

type MacbookColor = '#adb5bd' | '#2e2c2e'
type MacbookScale = 0.06 | 0.08

interface MackbookStore {
  color: MacbookColor
  scale: MacbookScale

  setColor: (color: MacbookColor) => void
  setScale: (scale: MacbookScale) => void

  reset: () => void
}

const useMackbookStore = create<MackbookStore>((set) => ({
  color: '#2e2c2e',
  scale: 0.08,

  setColor: (color) => set({ color }),
  setScale: (scale) => set({ scale }),

  reset: () =>
    set({
      color: '#2e2c2e',
      scale: 0.08,
    }),
}))

export default useMackbookStore