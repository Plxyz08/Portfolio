"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = window.innerWidth < 768 ? 1000 : 2000

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: resolvedTheme === "dark" ? 0x3b82f6 : 0x3b82f6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - window.innerWidth / 2) / 50 // Aumentado de 100 a 50 para mayor velocidad
      mouseY = (event.clientY - window.innerHeight / 2) / 50 // Aumentado de 100 a 50 para mayor velocidad
    }

    document.addEventListener("mousemove", onDocumentMouseMove)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.001 // Duplicado de 0.0005 a 0.001
      particlesMesh.rotation.y += 0.001 // Duplicado de 0.0005 a 0.001

      particlesMesh.rotation.x += mouseY * 0.001 // Duplicado de 0.0005 a 0.001
      particlesMesh.rotation.y += mouseX * 0.001 // Duplicado de 0.0005 a 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Update particle color when theme changes
    const updateParticleColor = () => {
      if (particlesMaterial) {
        particlesMaterial.color.set(resolvedTheme === "dark" ? 0x3b82f6 : 0x3b82f6)
      }
    }

    updateParticleColor()

    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", onDocumentMouseMove)
    }
  }, [resolvedTheme])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-60" aria-hidden="true" />
}

