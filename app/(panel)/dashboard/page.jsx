import { withAuth } from '@/lib/withAuth'
import { DashboardContent } from '@/components/panel/layouts/dashboard/dashbordContent'
import prisma from '@/lib/prisma'

export default async function DashboardPage () {
  const experienceCount = await prisma.experience.count()
  const skillCount = await prisma.skill.count()
  const educationCount = await prisma.education.count()
  const portfolioCount = await prisma.portfolio.count()

  const experiencePublishedCount = await prisma.experience.count({
    where: { isPublished: true }
  })
  const skillPublishedCount = await prisma.skill.count({
    where: { isPublished: true }
  })
  const educationPublishedCount = await prisma.education.count({
    where: { isPublished: true }
  })
  const portfolioPublishedCount = await prisma.portfolio.count({
    where: { isPublished: true }
  })

  const propsCounts = {
    experience: experienceCount,
    skill: skillCount,
    education: educationCount,
    portfolio: portfolioCount,
    experiencePublished: experiencePublishedCount,
    skillPublished: skillPublishedCount,
    educationPublished: educationPublishedCount,
    portfolioPublished: portfolioPublishedCount
  }

  const data = await prisma.visit.findMany({
    where: {
      timestamp: {
        gte: new Date(new Date().setDate(new Date().getDate() - 90)) // last 90 days
      }
    },
    orderBy: {
      timestamp: 'asc'
    }
  })

  // Group by date
  const grouped = {} // Record<string, { mobile: number; desktop: number }>
  data.forEach(visit => {
    const date = new Date(visit.timestamp).toISOString().split('T')[0]
    if (!grouped[date]) {
      grouped[date] = { mobile: 0, desktop: 0 }
    }
    grouped[date][visit.device]++
  })

  const chartData = Object.entries(grouped).map(([date, value]) => ({
    date,
    ...value
  }))

  return withAuth(session => (
    <DashboardContent
      session={session}
      counts={propsCounts}
      chartData={chartData}
    />
  ))
}
