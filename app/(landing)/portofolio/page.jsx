import { Portfolio } from '@/components/landing/layouts/portofolio/portofolioComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function PortofolioPage () {
  const portofolio = await prisma.portfolio.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  })

  return <Portfolio portofolio={portofolio} />
}
