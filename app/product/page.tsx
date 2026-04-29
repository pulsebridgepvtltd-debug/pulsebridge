"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import PageLayout from "@/components/page-layout"
import ContentCard from "@/components/content-card"
import { spacing, typography, buttons, animationVariants } from "@/lib/design-system"

export default function ProductPage() {
  const features = [
    {
      title: "FDA Approved",
      description: "Cleared by the FDA for treatment of opioid withdrawal symptoms.",
    },
    {
      title: "5-Day Treatment",
      description: "Worn continuously for 5 days with no replacement or maintenance needed.",
    },
    {
      title: "TENS Therapy",
      description:
        "Transcutaneous electrical nerve stimulation technology delivers targeted relief.",
    },
    {
      title: "Non-Pharmacological",
      description: "Works without opioids or other medications, reducing dependency risks.",
    },
  ]

  const specifications = [
    {
      label: "Clinical Efficacy",
      value: "31% COWS Score Reduction",
    },
    {
      label: "Success Rate",
      value: "88% Transition to Maintenance",
    },
    {
      label: "Wear Duration",
      value: "5 Days Continuous",
    },
    {
      label: "User Satisfaction",
      value: "94% Patient Compliance",
    },
  ]

  return (
    <PageLayout>
      <Header />

      <main className={`${spacing.section} relative z-10`}>
        <div className={spacing.container}>
          {/* Page Header */}
          <motion.div
            className="mb-20 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <motion.div variants={animationVariants.item}>
              <h1 className={`${typography.h2} mb-4`}>Pulse Bridge Device</h1>
              <p className={typography.body}>
                Advanced wearable technology designed for safe, effective opioid withdrawal management.
                Our FDA-approved device combines cutting-edge TENS therapy with clinical validation.
              </p>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Key Features
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {features.map((feature, index) => (
                <ContentCard key={index} delay={index}>
                  <h3 className="text-sm font-light text-white mb-2">{feature.title}</h3>
                  <p className="text-xs font-light text-white/70">{feature.description}</p>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Specifications */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Clinical Metrics
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {specifications.map((spec, index) => (
                <ContentCard key={index} delay={index} className="flex flex-col justify-between">
                  <p className="text-xs font-light text-white/70 mb-2">{spec.label}</p>
                  <p className="text-xl font-light text-white">{spec.value}</p>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Contraindications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0} className="mb-8">
              <h3 className={`${typography.h3} mb-6`}>Important Safety Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-light text-white mb-4">Contraindications</h4>
                  <ul className="space-y-2">
                    {[
                      "Implanted electronic devices (pacemakers, defibrillators)",
                      "Active malignancy",
                      "Severe cardiac arrhythmias",
                      "Pregnancy",
                      "Ischemic heart disease",
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-light text-white mb-4">Precautions</h4>
                  <ul className="space-y-2">
                    {[
                      "Skin sensitivity at electrode site",
                      "Periodic medical monitoring recommended",
                      "Not for use during swimming/bathing",
                      "May interfere with certain diagnostic procedures",
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ContentCard>

            <motion.button
              className={buttons.primary.base}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Request Prescription
            </motion.button>
          </motion.div>
        </div>
      </main>
    </PageLayout>
  )
}
