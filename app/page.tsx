"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import ShaderBackground from "@/components/shader-background"
import HospitalAtHome from "@/components/sections/hospital-at-home"
import ClinicalTrials from "@/components/sections/clinical-trials"
import SPatchSection from "@/components/sections/s-patch-section"
import CardiacMonitoring from "@/components/sections/cardiac-monitoring"
import BiometricsPlatform from "@/components/sections/biometrics-platform"
import SdkSection from "@/components/sections/sdk-section"
import Footer from "@/components/footer"

export default function ShaderShowcase() {
  return (
    <>
      <ShaderBackground>
        <Header />
        <HeroContent />
      </ShaderBackground>

      <main className="relative text-white">
        <HospitalAtHome />
        <ClinicalTrials />
        <SPatchSection />
        <CardiacMonitoring />
        <BiometricsPlatform />
        <SdkSection />
        <Footer />
      </main>
    </>
  )
}
