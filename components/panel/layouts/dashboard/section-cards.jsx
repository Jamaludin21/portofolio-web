import { IconTrendingUp } from '@tabler/icons-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function SectionCards ({ counts }) {
  const cardData = [
    {
      title: 'Experience',
      value: counts?.experience,
      description: 'Total Experience Records',
      footer: `Published experiences : ${counts?.experiencePublished}`
    },
    {
      title: 'Skills',
      value: counts?.skill,
      description: 'Total Skills Listed',
      footer: `Published skills : ${counts?.skillPublished}`
    },
    {
      title: 'Education',
      value: counts?.education,
      description: 'Education History Entries',
      footer: `Published education : ${counts?.educationPublished}`
    },
    {
      title: 'Portfolio',
      value: counts?.portfolio,
      description: 'Total Portfolio Projects',
      footer: `Published projects : ${counts?.portfolioPublished}`
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {cardData.map(card => (
        <Card className='@container/card' key={card.title}>
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {card.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-end gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {card.footer}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
