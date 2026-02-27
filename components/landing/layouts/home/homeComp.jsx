'use client'

import { Button } from '@/components/ui/button'
import { useRandomBackground } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function MainComp ({ dataMain }) {
  const bgImage = useRandomBackground()

  return (
    <section
      id='home-section'
      className='relative min-h-screen bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Dynamic Overlay: Menggunakan bg-background agar kontras di light/dark mode */}
      <div className='absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px] z-0' />

      {/* Content Wrapper */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24 min-h-screen max-w-6xl mx-auto'>
        {/* Greeting */}
        <motion.p
          className='text-sm sm:text-base font-bold text-primary tracking-widest uppercase mb-4'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Hi, I’m {dataMain?.name}
        </motion.p>

        {/* Role / Headline (Interactive Gradient) */}
        <motion.h1
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight text-balance'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className='bg-gradient-to-r from-primary via-indigo-500 to-blue-500 bg-clip-text text-transparent'>
            {dataMain?.role}
          </span>
        </motion.h1>

        {/* Summary */}
        <motion.p
          className='max-w-2xl text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed text-balance'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {dataMain?.summary}
        </motion.p>

        {/* Call to Action with hover effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href='/about'>
            <Button
              size='lg'
              className='group rounded-full px-8 h-14 text-base font-semibold shadow-lg transition-all hover:scale-105'
            >
              Wanna know more about me?
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
