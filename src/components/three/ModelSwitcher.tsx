import { PresentationControls } from '@react-three/drei'
import { useLayoutEffect, useRef, type FC } from 'react'
import * as THREE from 'three'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import MackbookModel14 from '../models/Macbook-14'
import Macbook16Model from '../models/Macbook-16'

type ModelSwitcherProps = {
	isMobile: boolean
	scale: number
}

const ANIMATION_DURATION = 1
const OFFSET_DISTANCE = 5

const setOpacityInstant = (
	group: THREE.Group | null,
	opacity: number,
): void => {
	if (!group) return

	group.traverse((child: THREE.Object3D) => {
		if ((child as THREE.Mesh).isMesh) {
			const mesh = child as THREE.Mesh
			const material = mesh.material

			if (Array.isArray(material)) {
				material.forEach(mat => {
					if ('opacity' in mat) {
						mat.transparent = true
						mat.opacity = opacity
					}
				})
			} else {
				if ('opacity' in material) {
					material.transparent = true
					material.opacity = opacity
				}
			}
		}
	})
}

const fadeMeshes = (group: THREE.Group | null, opacity: number): void => {
	if (!group) return

	group.traverse((child: THREE.Object3D) => {
		if ((child as THREE.Mesh).isMesh) {
			const mesh = child as THREE.Mesh
			const material = mesh.material

			if (Array.isArray(material)) {
				material.forEach(mat => {
					if ('opacity' in mat) {
						mat.transparent = true
						gsap.to(mat, {
							opacity,
							duration: ANIMATION_DURATION,
							immediateRender: false,
						})
					}
				})
			} else {
				if ('opacity' in material) {
					material.transparent = true
					gsap.to(material, {
						opacity,
						duration: ANIMATION_DURATION,
						immediateRender: false,
					})
				}
			}
		}
	})
}

const moveGroup = (group: THREE.Group | null, x: number): void => {
	if (!group) return

	gsap.to(group.position, {
		x,
		duration: ANIMATION_DURATION,
		immediateRender: false,
	})
}

const ModelSwitcher: FC<ModelSwitcherProps> = ({ scale, isMobile }) => {
	const smallMacbookRef = useRef<THREE.Group | null>(null)
	const largeMacbookRef = useRef<THREE.Group | null>(null)

	const showLargeMackbook = scale === 0.08 || scale === 0.05

	useLayoutEffect(() => {
		if (showLargeMackbook) {
			smallMacbookRef.current?.position.set(-OFFSET_DISTANCE, 0, 0)
			largeMacbookRef.current?.position.set(0, 0, 0)

			setOpacityInstant(smallMacbookRef.current, 0)
			setOpacityInstant(largeMacbookRef.current, 1)
		} else {
			smallMacbookRef.current?.position.set(0, 0, 0)
			largeMacbookRef.current?.position.set(OFFSET_DISTANCE, 0, 0)

			setOpacityInstant(smallMacbookRef.current, 1)
			setOpacityInstant(largeMacbookRef.current, 0)
		}
	}, [])

	useGSAP(() => {
		if (showLargeMackbook) {
			moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE)
			moveGroup(largeMacbookRef.current, 0)

			fadeMeshes(smallMacbookRef.current, 0)
			fadeMeshes(largeMacbookRef.current, 1)
		} else {
			moveGroup(smallMacbookRef.current, 0)
			moveGroup(largeMacbookRef.current, OFFSET_DISTANCE)

			fadeMeshes(smallMacbookRef.current, 1)
			fadeMeshes(largeMacbookRef.current, 0)
		}
	}, [scale])

	const controlsConfig = {
		snap: true,
		speed: 1,
		zoom: 1,
		azimuth: [-Infinity, Infinity] as [number, number],
		config: { mass: 1, tension: 0, friction: 26 },
	}

	return (
		<>
			<PresentationControls {...controlsConfig}>
				<group ref={largeMacbookRef}>
					<Macbook16Model scale={isMobile ? 0.05 : 0.08} />
				</group>
			</PresentationControls>

			<PresentationControls {...controlsConfig}>
				<group ref={smallMacbookRef}>
					<MackbookModel14 scale={isMobile ? 0.03 : 0.06} />
				</group>
			</PresentationControls>
		</>
	)
}

export default ModelSwitcher
