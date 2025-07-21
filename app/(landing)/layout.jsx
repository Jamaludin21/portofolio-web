import React from 'react'
import { NavbarLanding } from '@/components/landing/navbar/navbarComp'
import { Providers } from '@/lib/theme'

export default function LandingLayout ({ children }) {
  return (
    <Providers>
      <NavbarLanding />
      <main>{children}</main>
    </Providers>
  )
}
