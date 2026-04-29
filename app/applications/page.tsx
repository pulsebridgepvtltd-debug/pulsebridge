"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import PageLayout from "@/components/page-layout"
import ContentCard from "@/components/content-card"
import { spacing, typography, animationVariants } from "@/lib/design-system"

export default function ApplicationsPage() {
  const applications = [
    {
      title: "Cardiology",
      icon: "❤️",
      description: "Continuous ECG Monitoring",
      content:
        "Pulse Bridge monitors cardiac activity in real-time during opioid withdrawal, detecting and alerting to atrial fibrillation and arrhythmias. Provides critical data for cardiology teams managing high-risk patients with cardiac comorbidities.",
      benefits: [
        "Real-time arrhythmia detection",
        "Reduced cardiac events",
        "Continuous monitoring during treatment",
        "Enhanced patient safety",
      ],
    },
    {
      title: "Oncology",
      icon: "🔬",
      description: "Neutropenic Event Prevention",
      content:
        "Cancer patients undergoing chemotherapy often experience opioid requirements and withdrawal complications. Pulse Bridge enables safe withdrawal management while immune-compromised patients receive chemotherapy.",
      benefits: [
        "Cancer pain management integration",
        "Infection risk reduction",
        "Treatment continuity",
        "Quality of life improvement",
      ],
    },
    {
      title: "Neurology",
      icon: "🧠",
      description: "Safety Assessment & Monitoring",
      content:
        "Provides continuous temperature and neurological status monitoring during withdrawal. Critical for patients with seizure disorders, neuropathies, or neurological comorbidities requiring specialized oversight.",
      benefits: [
        "Seizure risk monitoring",
        "Temperature regulation tracking",
        "Neurological safety assessments",
        "Enhanced clinical decision-making",
      ],
    },
    {
      title: "Hypertension Management",
      icon: "⚡",
      description: "Pulmonary Hypertension Therapy",
      content:
        "Opioid withdrawal can trigger hypertensive crises in susceptible patients. Pulse Bridge monitoring helps manage blood pressure fluctuations, enabling safe withdrawal in patients requiring pulmonary hypertension therapies.",
      benefits: [
        "Blood pressure stabilization",
        "Hypertensive crisis prevention",
        "Therapy integration support",
        "Improved clinical outcomes",
      ],
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
              <h1 className={`${typography.h2} mb-4`}>Clinical Applications</h1>
              <p className={typography.body}>
                Pulse Bridge extends beyond opioid withdrawal to support integrated care across multiple
                specialties. Our technology enables safe, monitored withdrawal management for patients with
                complex medical comorbidities.
              </p>
            </motion.div>
          </motion.div>

          {/* Applications Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            {applications.map((app, index) => (
              <ContentCard key={index} delay={index} className="flex flex-col">
                <div className="mb-4">
                  <div className="text-3xl mb-2">{app.icon}</div>
                  <h3 className="text-lg font-light text-white">{app.title}</h3>
                  <p className="text-xs font-light text-purple mt-1">{app.description}</p>
                </div>

                <p className="text-xs font-light text-white/70 mb-4 flex-grow">{app.content}</p>

                <div>
                  <p className="text-xs font-light text-white/90 mb-3">Key Benefits:</p>
                  <ul className="space-y-2">
                    {app.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        <span className="text-purple mr-2">→</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentCard>
            ))}
          </motion.div>

          {/* Integration Overview */}
          <motion.div
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0}>
              <h3 className={`${typography.h3} mb-6`}>Integrated Care Workflows</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-light text-white mb-4">Clinical Integration</h4>
                  <ul className="space-y-2">
                    {[
                      "EHR system integration",
                      "Physician alert protocols",
                      "Real-time data dashboards",
                      "Automated reporting",
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        <span className="text-purple mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-light text-white mb-4">Multi-Specialty Support</h4>
                  <ul className="space-y-2">
                    {[
                      "Specialist consultation workflows",
                      "Coordinated care protocols",
                      "Shared clinical data",
                      "Outcome tracking",
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-light text-white/70">
                        <span className="text-purple mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ContentCard>
          </motion.div>
        </div>
      </main>
    </PageLayout>
  )
}
