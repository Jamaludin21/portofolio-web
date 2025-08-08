import { Loader } from 'lucide-react' // or any icon library
import React from 'react'

export default function ServerLoader ({
  message = 'Loading...',
  panelPage = false
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 animate-pulse text-black dark:text-muted-foreground ${
        panelPage ? 'min-h-[85vh]' : 'min-h-screen'
      }`}
    >
      <Loader className='w-6 h-6 animate-spin mb-2' />
      <p className='text-sm'>{message}</p>
    </div>
  )
}
