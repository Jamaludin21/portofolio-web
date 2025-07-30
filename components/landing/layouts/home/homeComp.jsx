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
      className='min-h-screen bg-center bg-cover'
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className='absolute inset-0 bg-black/40 dark:bg-black/60 z-0'>
        <div className='h-screen z-10 mx-auto max-w-6xl px-4 flex flex-col justify-center items-center text-center'>
          {/* Introduction */}
          <motion.p
            className='text-sm font-medium text-indigo-600 mb-3'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Hi, I’m {dataMain?.name}
          </motion.p>

          {/* Headline */}
          <motion.h1
            className='max-w-2xl text-4xl md:text-5xl font-bold dark:text-white leading-tight mb-6'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {dataMain?.role}
          </motion.h1>

          {/* Summary */}
          <motion.p
            className='max-w-xl text-base text-gray-600 dark:text-gray-300 mb-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            {dataMain?.summary}
          </motion.p>

          {/* CTA */}
          <Link href='/about'>
            <Button variant='outline' size='lg' className='cursor-pointer'>
              Wanna know more about me?
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
