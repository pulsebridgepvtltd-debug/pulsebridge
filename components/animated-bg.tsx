"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none"
      style={{ contain: "paint" }}
    >
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
        speed={0.18}
        maxPixelCount={1_300_000}
        minPixelRatio={1}
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  )
}
