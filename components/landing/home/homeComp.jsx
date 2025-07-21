'use client'

import { useRandomBackground } from '@/hooks/use-theme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { experienceData } from '@/lib/helper'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'

export function MainComp () {
  const bgImage = useRandomBackground()
  return (
    <section
      id='home'
      className='min-h-screen bg-center bg-cover'
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className='h-screen mx-auto max-w-6xl px-4 flex flex-col justify-center items-center text-center'>
        {/* Introduction */}
        <motion.p
          className='text-sm font-medium text-indigo-600 mb-3'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Hi, I’m Jamaludin Hakim Harsoyo
        </motion.p>

        {/* Headline */}
        <motion.h1
          className='max-w-2xl text-4xl md:text-5xl font-bold dark:text-white leading-tight mb-6'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Full Stack Developer & Tech Enthusiast
        </motion.h1>

        {/* Summary */}
        <motion.p
          className='max-w-xl text-base text-gray-600 dark:text-gray-300 mb-10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          I specialize in building scalable web applications, crafting intuitive
          user interfaces, and transforming ideas into interactive digital
          experiences. With experience in modern JavaScript frameworks and
          backend architecture, I bring products to life with clean code and
          strong design sense.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          className='absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center text-indigo-600 gap-2 cursor-pointer'
          onClick={() => {
            const section = document.getElementById('experience')
            section?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <ChevronDown className='animate-bounce' />
          <span className='text-sm font-medium'>
            Scroll to view work experience
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export function WorkExperience () {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { margin: '-100px' })
  const [active, setActive] = useState(experienceData[0].id)
  const bgImage = useRandomBackground()

  return (
    <motion.section
      ref={sectionRef}
      id='experience'
      animate={isInView ? 'visible' : 'hidden'}
      className='min-h-screen bg-center bg-cover overflow-hidden py-24'
      variants={staggerContainer}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className='px-6 xl:px-20'>
        <div className='flex flex-col md:flex-row w-full gap-8'>
          {/* Navigation List */}
          <motion.div
            variants={fadeInLeft}
            className='w-full md:max-w-[220px] md:border-r md:border-gray-200'
          >
            <ul className='tab-nav flex flex-col md:items-start items-center lg:gap-10 gap-6'>
              {experienceData.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`font-medium text-base leading-7 transition-colors duration-300 ${
                      active === item.id
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-indigo-600'
                    }`}
                  >
                    {item.title}
                    <span className='block text-sm text-gray-400'>
                      {item.duration}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Content Display */}
          <motion.div
            variants={fadeInRight}
            className='w-full max-md:px-4 relative min-h-[200px]'
          >
            <AnimatePresence mode='wait'>
              {experienceData
                .filter(item => item.id === active)
                .map(item => (
                  <motion.div
                    key={item.id}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={fadeInRight}
                    transition={{ duration: 0.4 }}
                    className='absolute inset-0'
                  >
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                      {item.title}
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-200 mb-2 font-semibold'>
                      {item.company} | {item.duration}
                    </p>
                    <p className='text-lg leading-8 text-gray-500 dark:text-gray-400'>
                      {item.content}
                    </p>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
