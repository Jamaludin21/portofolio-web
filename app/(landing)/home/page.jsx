import { MainComp } from '@/components/landing/layouts/home/homeComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function LandingPage () {
  const hero = await prisma.hero.findFirst({
    where: { isPublished: true }
  })

  return <MainComp dataMain={hero} />
}
