import { BioContent } from '@/components/panel/layouts/biodata/bioContent'
import prisma from '@/lib/prisma'
import { withAuth } from '@/lib/withAuth'

export default async function BioPage () {
  const [experience, skills, education] = await Promise.all([
    prisma.experience.findMany({ orderBy: [{ startDate: 'desc' }] }),
    prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { level: 'desc' }]
    }),
    prisma.education.findMany({ orderBy: [{ startDate: 'desc' }] })
  ])

  const propsValue = { experience, skills, education }
  return withAuth(session => (
    <BioContent session={session} propsValue={propsValue} />
  ))
}
