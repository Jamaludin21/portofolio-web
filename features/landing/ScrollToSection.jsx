'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollToSection ({
  targetId = '',
  label = 'Scroll to section',
  icon: Icon = ChevronDown,
  className = '',
  motionProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.6 }
  }
}) {
  const handleScroll = () => {
    const section = document.getElementById(targetId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      {...motionProps}
      className={`absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center text-indigo-600 gap-2 cursor-pointer z-50 ${className}`}
      onClick={handleScroll}
    >
      <Icon className='animate-bounce' />
      <span className='text-sm font-medium'>{label}</span>
    </motion.div>
  )
}
