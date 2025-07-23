import { AboutMe } from '@/components/landing/layouts/about/aboutMeComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function AboutPage () {
  const hero = await prisma.hero.findMany({
    where: { isPublished: true }
  })

  const experience = await prisma.experience.findMany({
    where: { isPublished: true }
  })

  const skill = await prisma.skill.findMany({
    where: { isPublished: true }
  })

  const education = await prisma.education.findMany({
    where: { isPublished: true }
  })

  return (
    <AboutMe
      hero={hero[0]}
      experience={experience}
      skills={skill}
      education={education}
    />
  )
}
