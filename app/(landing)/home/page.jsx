import {
  ContactMe,
  MainComp,
  WorkExperience
} from '@/components/landing/home/homeComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function LandingPage () {
  const hero = await prisma.hero.findFirst({
    where: { isPublished: true }
  })
  const experiences = await prisma.experience.findMany({
    where: { isPublished: true }
  })

  return (
    <React.Fragment>
      <MainComp dataMain={hero} />
      <WorkExperience dataExperience={experiences} />
      <ContactMe />
    </React.Fragment>
  )
}
