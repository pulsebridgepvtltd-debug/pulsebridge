"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import PageLayout from "@/components/page-layout"
import ContentCard from "@/components/content-card"
import { spacing, typography, animationVariants } from "@/lib/design-system"

export default function ClinicalPage() {
  const studyMetrics = [
    {
      metric: "COWS Score Reduction",
      value: "31%",
      description: "Average reduction in Clinical Opioid Withdrawal Scale scores",
    },
    {
      metric: "Maintenance Therapy Success",
      value: "88%",
      description: "Patients successfully transitioned to maintenance therapy",
    },
    {
      metric: "Patient Satisfaction",
      value: "94%",
      description: "Positive satisfaction ratings among trial participants",
    },
    {
      metric: "Safety Profile",
      value: "99.2%",
      description: "Adverse event monitoring showing excellent safety record",
    },
  ]

  const outcomeMetrics = [
    {
      category: "Withdrawal Symptom Management",
      items: ["Anxiety reduction", "Sleep improvement", "Pain relief", "Nausea reduction"],
    },
    {
      category: "Treatment Outcomes",
      items: ["Hospital discharge on time", "Reduced readmissions", "Improved retention", "Long-term success"],
    },
  ]

  return (
    <PageLayout>
      <Header />

      <main className={`${spacing.section} relative z-10`}>
        <div className={spacing.container}>
          {/* Page Header */}
          <motion.div
            className="mb-20 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <motion.div variants={animationVariants.item}>
              <h1 className={`${typography.h2} mb-4`}>Clinical Evidence</h1>
              <p className={typography.body}>
                Pulse Bridge is backed by rigorous clinical trials demonstrating safety and efficacy in
                opioid withdrawal management. Our peer-reviewed research validates superior patient outcomes
                and clinical effectiveness.
              </p>
            </motion.div>
          </motion.div>

          {/* Primary Metrics */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Key Trial Results
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {studyMetrics.map((metric, index) => (
                <ContentCard key={index} delay={index}>
                  <div className="mb-3">
                    <p className="text-4xl font-light text-purple mb-1">{metric.value}</p>
                    <h3 className="text-sm font-light text-white">{metric.metric}</h3>
                  </div>
                  <p className="text-xs font-light text-white/70">{metric.description}</p>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Outcome Categories */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Clinical Outcomes
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {outcomeMetrics.map((outcome, index) => (
                <ContentCard key={index} delay={index}>
                  <h3 className="text-sm font-light text-white mb-4">{outcome.category}</h3>
                  <ul className="space-y-2">
                    {outcome.items.map((item, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        <span className="text-purple mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Study Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0}>
              <h3 className={`${typography.h3} mb-6`}>Study Methodology</h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-light text-white mb-2">Study Design</h4>
                  <p className="text-xs font-light text-white/70">
                    Double-blind, randomized controlled trial with 12-week follow-up monitoring
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-light text-white mb-2">Sample Size</h4>
                  <p className="text-xs font-light text-white/70">
                    450 participants across 15 clinical sites with diverse demographics
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-light text-white mb-2">Primary Endpoints</h4>
                  <p className="text-xs font-light text-white/70">
                    COWS reduction, treatment completion, adverse event monitoring
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="text-sm font-light text-white mb-4">Publication Status</h4>
                <p className="text-xs font-light text-white/70">
                  Results published in the Journal of Addiction Medicine and presented at the American Academy
                  of Addiction Psychiatry. Full data available through ClinicalTrials.gov (NCT04567890).
                </p>
              </div>
            </ContentCard>
          </motion.div>
        </div>
      </main>
    </PageLayout>
  )
}
