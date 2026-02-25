'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRandomBackground } from '@/hooks/useTheme'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

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
                  sizes='(max-width: 768px) 100vw, 50vw'
                  width={600}
                  height={400}
                  className='rounded-2xl object-cover w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105'
                  priority
                />
              </div>

              {/* Info */}
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h4 className='text-xl sm:text-2xl font-semibold text-white group-hover:text-indigo-500 mb-1'>
                      {item.title}
                    </h4>
                    <p className='text-sm sm:text-lg text-gray-300 dark:text-gray-400'>
                      {item.category}
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    {item.description && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type='button'
                            className='cursor-pointer focus:outline-none'
                            aria-label='More info'
                          >
                            <InfoIcon
                              size={18}
                              className='text-white hover:text-indigo-400 transition-colors'
                            />
                          </button>
                        </TooltipTrigger>

                        <TooltipContent className='bg-white text-black max-w-[80vw] sm:max-w-xs break-words whitespace-pre-wrap'>
                          {item.description}
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {/* CTA Arrow */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type='button'
                          aria-label='Open project link'
                          className='borde py-1 px-1 rounded-full bg-white/30 hover:bg-white/60 stroke-white hover:stroke-indigo-500 transition-all duration-300'
                          size='small'
                          onClick={() => window.open(item.projectUrl, '_blank')}
                        >
                          <svg
                            className='transition-all duration-300'
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
                      </TooltipTrigger>
                      <TooltipContent className='bg-white text-black text-xs font-medium'>
                        Open project link
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
