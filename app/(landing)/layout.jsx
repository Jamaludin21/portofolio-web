import React from 'react'
import { NavbarLanding } from '@/components/landing/navbar/navbarComp'
import { Providers } from '@/lib/theme'
import { TrafficLogger } from '@/hooks/useTrafficLogger'

export default function LandingLayout ({ children }) {
  return (
    <Providers>
      <TrafficLogger />
      <NavbarLanding />
      <main>{children}</main>
    </Providers>
  )
}
