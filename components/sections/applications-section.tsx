"use client"

import { motion } from "framer-motion"

const applications = [
  {
    title: "Cardiology",
    description: "Detect early AF transformation by capturing continuous ECG rhythm from patients in remote and ambulatory settings.",
  },
  {
    title: "Oncology",
    description: "Detect neutropenic events following chemotherapy by correlating multiple human vitals in discharged patients.",
  },
  {
    title: "Neurology",
    description: "Conduct safety assessments of a neurological therapy by monitoring body temperature over extended periods of time.",
  },
  {
    title: "Hypertension",
    description: "Assess pulmonary hypertension therapy efficacy by monitoring heart rate before, during, and after a six minute walk test.",
  },
]

export default function ApplicationsSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm">
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
            Medical Applications
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Our biometrics platform supports specialized applications across multiple medical specialties.
          </p>
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
            >
              <h3 className="text-xl font-light text-white mb-2">{app.title}</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">{app.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
