"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import PageLayout from "@/components/page-layout"
import ContentCard from "@/components/content-card"
import { spacing, typography, animationVariants } from "@/lib/design-system"

export default function AboutPage() {
  const timeline = [
    {
      year: "2018",
      title: "Research Begins",
      description: "Initial research into TENS therapy for opioid withdrawal starts at leading medical institute",
    },
    {
      year: "2020",
      title: "Clinical Trials",
      description: "Phase 2 clinical trials commence with 450 participants across 15 sites",
    },
    {
      year: "2022",
      title: "FDA Approval",
      description: "Pulse Bridge receives FDA clearance for opioid withdrawal treatment",
    },
    {
      year: "2023",
      title: "Market Launch",
      description: "Device becomes available through healthcare providers nationwide",
    },
    {
      year: "2024",
      title: "Clinical Integration",
      description: "Integration partnerships established with major hospital systems",
    },
  ]

  const values = [
    {
      title: "Patient-Centric",
      description: "Every decision prioritizes patient safety, comfort, and outcomes above all else.",
    },
    {
      title: "Evidence-Based",
      description: "Clinical decisions rooted in rigorous research and peer-reviewed evidence.",
    },
    {
      title: "Innovation",
      description: "Continuous advancement of technology to improve treatment efficacy.",
    },
    {
      title: "Accessibility",
      description: "Making effective treatment available to underserved communities.",
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
              <h1 className={`${typography.h2} mb-4`}>About Pulse Bridge</h1>
              <p className={typography.body}>
                Pulse Bridge represents six years of dedicated research, clinical validation, and innovation
                to provide a non-pharmacological solution for opioid withdrawal management. We are committed to
                transforming addiction treatment through evidence-based technology.
              </p>
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0} className="text-center">
              <h2 className={`${typography.h3} mb-4`}>Our Mission</h2>
              <p className={typography.body}>
                To provide safe, accessible, evidence-based treatment for opioid withdrawal,
                empowering patients to overcome addiction and reclaim their lives.
              </p>
            </ContentCard>
          </motion.div>

          {/* Core Values */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Core Values
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {values.map((value, index) => (
                <ContentCard key={index} delay={index}>
                  <h3 className="text-sm font-light text-white mb-2">{value.title}</h3>
                  <p className="text-xs font-light text-white/70">{value.description}</p>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <motion.h2
              className={`${typography.h3} mb-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.container}
            >
              {timeline.map((event, index) => (
                <ContentCard key={index} delay={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple/20">
                      <span className="text-purple font-light text-sm">{event.year}</span>
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-light text-white">{event.title}</h3>
                    <p className="text-xs font-light text-white/70 mt-1">{event.description}</p>
                  </div>
                </ContentCard>
              ))}
            </motion.div>
          </div>

          {/* Impact Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0}>
              <h3 className={`${typography.h3} mb-8`}>Impact & Results</h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-light text-purple mb-2">2,400+</p>
                  <p className="text-xs font-light text-white/70">Patients Successfully Treated</p>
                </div>

                <div>
                  <p className="text-3xl font-light text-purple mb-2">88%</p>
                  <p className="text-xs font-light text-white/70">Transition to Maintenance Therapy</p>
                </div>

                <div>
                  <p className="text-3xl font-light text-purple mb-2">50+</p>
                  <p className="text-xs font-light text-white/70">Healthcare Institutions Using Pulse Bridge</p>
                </div>
              </div>
            </ContentCard>
          </motion.div>
        </div>
      </main>
    </PageLayout>
  )
}
