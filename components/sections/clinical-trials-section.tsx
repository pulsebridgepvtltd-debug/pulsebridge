"use client"

import { motion } from "framer-motion"

const features = [
  "Remote Data Collection",
  "Vitals and Biometrics",
  "ePro/eCOA/Surveys",
  "Centralized Data Services",
  "Patient Adherence",
]

export default function ClinicalTrialsSection() {
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
            Innovative Digital Solutions for Clinical Trials
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Turnkey remote data capture services for human vitals and biometrics in clinical trials. User friendly wearable sensors combined with centralized data management help ensure optimal data integrity and patient adherence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
            >
              <p className="text-white/80 text-sm font-light">{feature}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-light text-sm transition-all duration-300">
            Read More
          </button>
        </motion.div>
      </div>
    </section>
  )
}
