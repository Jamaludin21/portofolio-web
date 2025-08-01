import { AboutMe } from '@/components/landing/layouts/about/aboutMeComp'
import prisma from '@/lib/prisma'
import { safeQuery } from '@/lib/safeQuery'

export default async function AboutPage () {
  const hero = await safeQuery(() =>
    prisma.hero.findMany({ where: { isPublished: true } })
  )

  const experience = await safeQuery(() =>
    prisma.experience.findMany({ where: { isPublished: true } })
  )

  const skill = await safeQuery(() =>
    prisma.skill.findMany({ where: { isPublished: true } })
  )

  const education = await safeQuery(() =>
    prisma.education.findMany({ where: { isPublished: true } })
  )

  // You can show fallback UI if data is null or empty
  const isError = !hero || !experience || !skill || !education

  if (isError) return

  return (
    <AboutMe
      hero={hero[0]}
      experience={experience}
      skills={skill}
      education={education}
    />
  )
}
