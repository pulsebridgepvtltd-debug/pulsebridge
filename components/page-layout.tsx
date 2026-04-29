"use client"

import type React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                        0 1 0 0 0.02
                        0 0 1 0 0.05
                        0 0 0 0.9 0"
                result="tint"
              />
            </filter>
          </defs>
        </svg>

        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
          speed={0.3}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
          speed={0.2}
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
