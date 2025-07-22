'use client'

import { useRandomBackground } from '@/hooks/useTheme'
import { SmartContentRenderer } from '@/hooks/useSmartRender'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import dayjs from 'dayjs'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollToSection } from '@/features/landing/ScrollToSection'

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
      <div className='h-screen mx-auto max-w-6xl px-4 flex flex-col justify-center items-center text-center'>
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

        <ScrollToSection
          targetId='experience-section'
          label='Scroll to view work experience'
        />
      </div>
    </section>
  )
}

export function WorkExperience ({ dataExperience }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [active, setActive] = useState(dataExperience[0].id)
  const bgImage = useRandomBackground()

  return (
    <motion.section
      ref={sectionRef}
      id='experience-section'
      animate={isInView ? 'visible' : 'hidden'}
      className='min-h-screen bg-center bg-cover overflow-hidden py-24'
      variants={staggerContainer}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className='px-6 xl:px-20'>
        <motion.h2
          variants={fadeInLeft}
          className='text-3xl font-bold text-gray-900 dark:text-gray-100 underline mb-10'
        >
          Work Experience
        </motion.h2>
        <div className='flex flex-col md:flex-row w-full gap-8'>
          {/* Navigation List */}
          <motion.div
            variants={fadeInLeft}
            className='w-full md:max-w-[220px] md:border-r md:border-gray-200'
          >
            <ul className='tab-nav flex flex-col md:items-start items-center lg:gap-10 gap-6'>
              {dataExperience?.map(item => (
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
                      {dayjs(item.startDate).format('MMM YYYY')} -{' '}
                      {item.endDate
                        ? dayjs(item.endDate).format('MMM YYYY')
                        : 'Present'}
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
              {dataExperience &&
                dataExperience
                  .filter(item => item.id === active)
                  .map(item => (
                    <motion.div
                      key={item.id}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      variants={fadeInRight}
                      transition={{ duration: 0.4 }}
                      className='absolute inset-0 flex justify-between'
                    >
                      <div>
                        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                          {item.title}
                        </h2>
                        <p className='text-lg text-gray-600 dark:text-gray-200 mb-2 font-semibold'>
                          {item.company} |{' '}
                          {dayjs(item.startDate).format('MMM YYYY')} -{' '}
                          {item.endDate
                            ? dayjs(item.endDate).format('MMM YYYY')
                            : 'Present'}{' '}
                          | {item.location}
                        </p>
                        <SmartContentRenderer
                          content={item.content}
                          className='text-gray-500 dark:text-gray-400 text-sm leading-7 mt-4'
                        />
                      </div>
                      <div>
                        <Image
                          src={item.imageUrl}
                          alt={item.company}
                          priority
                          height={150}
                          width={150}
                          className='dark:brightness-[0.8]'
                        />
                      </div>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export function ContactMe () {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const bgImage = useRandomBackground()
  return (
    <motion.section
      id='contact-section'
      ref={sectionRef}
      variants={staggerContainer}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      className='min-h-screen bg-center bg-cover overflow-hidden py-24'
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 '>
        {/* Left - Contact Details with Image */}
        <motion.div variants={fadeInLeft} className='relative'>
          <Image
            src='https://pagedone.io/asset/uploads/1696488602.png'
            alt='Contact illustration'
            className='w-full object-cover rounded-2xl'
            fill
          />
          <div className='absolute inset-0 bg-indigo-700/50 rounded-2xl'></div>
          <h2 className='absolute top-10 left-10 text-white text-4xl font-bold z-10'>
            Contact Me
          </h2>
          <div className='absolute bottom-0 w-full p-6 lg:p-11 z-10'>
            <div className='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6'>
              <div className='flex items-center gap-4'>
                <span className='text-indigo-600'>📞</span>
                <p className='text-gray-700 dark:text-gray-200 text-base'>
                  470-601-1911
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-indigo-600'>📧</span>
                <p className='text-gray-700 dark:text-gray-200 text-base'>
                  Pagedone1234@gmail.com
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-indigo-600'>📍</span>
                <p className='text-gray-700 dark:text-gray-200 text-base'>
                  654 Sycamore Avenue, Meadowville, WA 76543
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          variants={fadeInRight}
          className='bg-white dark:bg-gray-800 p-6 lg:p-11 rounded-2xl shadow-md'
        >
          <h2 className='text-indigo-600 text-3xl font-semibold mb-8'>
            Send Us A Message
          </h2>
          <form className='space-y-6'>
            <Input
              type='text'
              placeholder='Name'
              className='w-full h-12 px-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 text-base'
              required
            />
            <Input
              type='email'
              placeholder='Email'
              className='w-full h-12 px-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 text-base'
              required
            />
            <Input
              type='tel'
              placeholder='Phone'
              className='w-full h-12 px-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 text-base'
            />
            <div>
              <h4 className='text-gray-600 dark:text-gray-300 text-base mb-2'>
                Preferred method of communication
              </h4>
              <div className='flex gap-6'>
                <label className='flex items-center text-gray-600 dark:text-gray-300'>
                  <input type='radio' name='contact_method' className='mr-2' />{' '}
                  Email
                </label>
                <label className='flex items-center text-gray-600 dark:text-gray-300'>
                  <input type='radio' name='contact_method' className='mr-2' />{' '}
                  Phone
                </label>
              </div>
            </div>
            <Textarea
              placeholder='Message'
              className='w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 text-base resize-none'
              required
            />
            <button
              type='submit'
              className='w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-300'
            >
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}
