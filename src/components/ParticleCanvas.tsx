import React, { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  vx: number
  vy: number
  color: { r: number; g: number; b: number }
  targetColor: { r: number; g: number; b: number }
}

export const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: -1000, y: -1000, radius: 120 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let initAttempts = 0
    const maxAttempts = 5

    const init = () => {
      // Use document dimensions for better mobile viewport handling
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      canvas.width = width
      canvas.height = height
      particles.current = []

      const density = 25
      const cols = Math.floor(width / density)
      const rows = Math.floor(height / density)

      const offsetX = (width - (cols - 1) * density) / 2
      const offsetY = (height - (rows - 1) * density) / 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * density
          const y = offsetY + j * density

          particles.current.push({
            x,
            y,
            originX: x,
            originY: y,
            size: 2,
            vx: 0,
            vy: 0,
            color: { r: 255, g: 255, b: 255 },
            targetColor: { r: 255, g: 255, b: 255 },
          })
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.current.radius) {
          // Push away effect
          const force = (mouse.current.radius - dist) / mouse.current.radius
          const angle = Math.atan2(dy, dx)
          const tx = p.x - Math.cos(angle) * force * 15
          const ty = p.y - Math.sin(angle) * force * 15

          p.vx += (tx - p.x) * 0.2
          p.vy += (ty - p.y) * 0.2

          // Color transition (Blue, Green, Red cycle or based on mouse dist)
          // We can use the normalized force to blend colors
          // For blue/green/red variety, we use position or random-ish logic
          const colorSelector = (p.originX + p.originY) % 3
          if (colorSelector === 0) p.targetColor = { r: 117, g: 159, b: 240 } // Blue
          else if (colorSelector === 1) p.targetColor = { r: 85, g: 219, b: 246 } // Cyan/Greenish
          else p.targetColor = { r: 239, g: 68, b: 68 } // Red
        } else {
          // Return to origin
          p.vx += (p.originX - p.x) * 0.05
          p.vy += (p.originY - p.y) * 0.05
          p.targetColor = { r: 255, g: 255, b: 255 }
        }

        p.vx *= 0.9
        p.vy *= 0.9
        p.x += p.vx
        p.y += p.vy

        // Lerp color
        p.color.r += (p.targetColor.r - p.color.r) * 0.1
        p.color.g += (p.targetColor.g - p.color.g) * 0.1
        p.color.b += (p.targetColor.b - p.color.b) * 0.1

        ctx.fillStyle = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX
        mouse.current.y = e.touches[0].clientY
      }
    }

    const handleMouseLeave = () => {
      mouse.current.x = -1000
      mouse.current.y = -1000
    }

    const handleOrientationChange = () => {
      // Reset attempts and re-init on orientation change
      initAttempts = 0
      setTimeout(init, 100)
    }

    const handleResize = () => {
      initAttempts = 0
      init()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)

    // Also listen for visibility change to re-init when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        initAttempts = 0
        setTimeout(init, 100)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    init()
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ 
        background: "#16181D",
        minWidth: "100vw",
        minHeight: "100vh",
        width: "100%",
        height: "100%"
      }}
    />
  )
}
