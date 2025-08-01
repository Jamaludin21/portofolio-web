'use client'

import { Button } from '@/components/ui/button'
import { useRandomBackground } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
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
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/40 dark:bg-black/60 z-0' />

      {/* Content Wrapper */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24 min-h-screen max-w-6xl mx-auto'>
        {/* Greeting */}
        <motion.p
          className='text-sm sm:text-base font-medium text-indigo-500 mb-4'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Hi, I’m {dataMain?.name}
        </motion.p>

        {/* Role / Headline */}
        <motion.h1
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {dataMain?.role}
        </motion.h1>

        {/* Summary */}
        <motion.p
          className='max-w-2xl text-sm sm:text-base text-gray-300 mb-10 leading-relaxed text-balance'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {dataMain?.summary}
        </motion.p>

        {/* Call to Action */}
        <Link href='/about'>
          <Button
            variant='outline'
            size='lg'
            className='text-black dark:text-white hover:bg-white hover:text-indigo-500 dark:hover:text-indigo-500 transition cursor-pointer'
          >
            Wanna know more about me?
          </Button>
        </Link>
      </div>
    </section>
  )
}
