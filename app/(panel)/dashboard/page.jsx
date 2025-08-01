import { DashboardContent } from '@/components/panel/layouts/dashboard/dashbordContent'
import { withAuth } from '@/lib/withAuth'

export default async function DashboardPage () {
  return withAuth(session => <DashboardContent session={session} />)
}
