"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import PageLayout from "@/components/page-layout"
import ContentCard from "@/components/content-card"
import { spacing, typography, buttons, animationVariants } from "@/lib/design-system"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", role: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      title: "Healthcare Providers",
      description: "For prescription inquiries and clinical integration",
      contact: "providers@pulsebridge.com",
    },
    {
      title: "Patient Support",
      description: "For device questions and usage support",
      contact: "support@pulsebridge.com",
    },
    {
      title: "Research & Partnerships",
      description: "For clinical research and collaboration opportunities",
      contact: "research@pulsebridge.com",
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
              <h1 className={`${typography.h2} mb-4`}>Get In Touch</h1>
              <p className={typography.body}>
                Have questions about Pulse Bridge? Our team is here to help. Whether you&apos;re a healthcare
                provider, patient, or researcher, we&apos;d love to hear from you.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ContentCard>
                  <h3 className="text-sm font-light text-white mb-2">{info.title}</h3>
                  <p className="text-xs font-light text-white/70 mb-4">{info.description}</p>
                  <a href={`mailto:${info.contact}`} className="text-xs font-light text-purple hover:text-white transition-colors">
                    {info.contact}
                  </a>
                </ContentCard>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0}>
              <h2 className={`${typography.h3} mb-8`}>Send us a Message</h2>

              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white mb-2">Thank you for reaching out!</p>
                  <p className="text-xs font-light text-white/70">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className={`block ${typography.label} mb-2`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block ${typography.label} mb-2`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className={`block ${typography.label} mb-2`}>
                      I am a...
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-colors"
                    >
                      <option value="">Select your role</option>
                      <option value="healthcare-provider">Healthcare Provider</option>
                      <option value="patient">Patient</option>
                      <option value="researcher">Researcher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={`block ${typography.label} mb-2`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className={buttons.primary.base}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </ContentCard>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.container}
          >
            <ContentCard delay={0}>
              <h3 className={`${typography.h3} mb-6`}>Additional Resources</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-light text-white mb-4">For Patients</h4>
                  <ul className="space-y-2">
                    {["Frequently Asked Questions", "Device User Guide", "Patient Success Stories", "Insurance Information"].map((item, i) => (
                      <li key={i}>
                        <a href="#" className="text-xs font-light text-purple hover:text-white transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-light text-white mb-4">For Providers</h4>
                  <ul className="space-y-2">
                    {["Prescribing Information", "Clinical Guidelines", "Integration Guide", "Training Resources"].map((item, i) => (
                      <li key={i}>
                        <a href="#" className="text-xs font-light text-purple hover:text-white transition-colors">
                          {item}
                        </a>
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
