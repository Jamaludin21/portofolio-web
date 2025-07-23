'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { dataPortfolio } from '@/lib/helper'

export function Portfolio () {
  const bgImage = useRandomBackground()

  return (
    <motion.section
      id='portfolio-section'
      className='py-24 bg-cover bg-center'
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='w-full max-w-7xl px-6 mx-auto'>
        <motion.h2
          variants={fadeInLeft}
          className='text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center md:text-left'
        >
          Professional Project Achievements
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {dataPortfolio?.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={fadeInRight}
              className='flex flex-col items-center gap-6 group'
            >
              {/* Image */}
              <div className='w-full overflow-hidden rounded-3xl'>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className='rounded-3xl object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105'
                />
              </div>

              {/* Info */}
              <div className='flex items-center justify-between w-full'>
                <div>
                  <h4 className='text-2xl font-semibold text-gray-900 dark:text-white mb-1'>
                    {item.title}
                  </h4>
                  <p className='text-lg text-gray-500 dark:text-gray-400'>
                    {item.category}
                  </p>
                </div>

                {/* CTA Arrow */}
                <button className='border border-black dark:border-white py-2 px-3.5 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-all duration-300'>
                  <svg
                    className='stroke-black dark:stroke-white group-hover:stroke-white dark:group-hover:stroke-black transition-all duration-300'
                    xmlns='http://www.w3.org/2000/svg'
                    width='17'
                    height='16'
                    viewBox='0 0 17 16'
                    fill='none'
                  >
                    <path
                      d='M9.62553 4L13.6664 8.0409M13.6664 8.0409L9.62553 12.0818M13.6664 8.0409L1.6665 8.0409'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
