"use client"

import { useState } from "react"
import RequestDemoModal from "@/components/request-demo-modal"

interface RequestDemoButtonProps {
  className?: string
  source?: string
  children: React.ReactNode
}

export default function RequestDemoButton({
  className,
  source,
  children,
}: RequestDemoButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <RequestDemoModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  )
}
