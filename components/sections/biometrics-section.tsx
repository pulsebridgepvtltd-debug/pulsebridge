"use client"

import { motion } from "framer-motion"

export default function BiometricsSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-black/80 to-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Advanced Biometrics Platform
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            PulseBridge Health Care Biometrics Data Platform provides a unified solution to streamline the development and deployment of digital healthcare applications. The platform supports various use cases, including mobile cardiac telemetry, monitoring of neutropenic fever, COPD management, and more.
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/70 text-sm font-light leading-relaxed mb-8 max-w-3xl"
        >
          Our comprehensive biometrics data platform for data collection and analysis empowers healthcare providers with real-time insights and continuous monitoring capabilities.
        </motion.p>
      </div>
    </section>
  )
}
