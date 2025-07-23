'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRef } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function ContactMe () {
  useDocumentTitle('Contact Me')
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
