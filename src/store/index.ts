import { create } from 'zustand'

type MacbookColor = '#adb5bd' | '#2e2c2e'
type MacbookScale = 0.06 | 0.08

interface MackbookStore {
	color: MacbookColor
	scale: MacbookScale
    texture: string
    setTexture: (texture: string) => void

	setColor: (color: MacbookColor) => void
	setScale: (scale: MacbookScale) => void

	reset: () => void
}

const useMackbookStore = create<MackbookStore>(set => ({
	color: '#2e2c2e',
	scale: 0.08,

	setColor: color => set({ color }),
	setScale: scale => set({ scale }),

	texture: '/videos/feature-1.mp4',
	setTexture: texture => set({ texture }),

	reset: () =>
		set({
			color: '#2e2c2e',
			scale: 0.08,
            texture: '/videos/feature-1.mp4'
		}),
}))

export default useMackbookStore
