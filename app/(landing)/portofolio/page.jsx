import { Portfolio } from '@/components/landing/layouts/portofolio/portofolioComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function PortofolioPage () {
  // const hero = await prisma.hero.findFirst({
  //   where: { isPublished: true }
  // })

  return <Portfolio />
}
