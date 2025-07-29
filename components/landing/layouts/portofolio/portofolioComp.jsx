'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Portfolio ({ portofolio: dataPortfolio }) {
  const bgImage = useRandomBackground()

  return (
    <motion.section
      id='portfolio-section'
      className='relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed py-20 sm:py-24 lg:py-32'
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Optional: dark overlay for better text visibility */}
      <div className='absolute inset-0 bg-black/40 dark:bg-black/60 z-0' />

      {/* Content */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          variants={fadeInLeft}
          className='text-3xl sm:text-4xl font-bold text-white mb-10 text-center md:text-left'
        >
          Professional Projects
        </motion.h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
          {dataPortfolio?.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={fadeInRight}
              className='flex flex-col items-center gap-6 group'
            >
              {/* Image */}
              <div className='w-full aspect-video overflow-hidden rounded-2xl'>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  layout='responsive'
                  width={600}
                  height={400}
                  className='rounded-2xl object-cover w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105'
                />
              </div>

              {/* Info */}
              <div className='flex items-center justify-between w-full'>
                <div>
                  <h4 className='text-xl sm:text-2xl font-semibold text-white mb-1'>
                    {item.title}
                  </h4>
                  <p className='text-sm sm:text-lg text-gray-300 dark:text-gray-400'>
                    {item.category}
                  </p>
                </div>

                {/* CTA Arrow */}
                <Button
                  className='border border-white py-2 px-3.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300'
                  onClick={() => window.open(item.projectUrl, '_blank')}
                >
                  <svg
                    className='stroke-white group-hover:stroke-black transition-all duration-300'
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
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
