import { ContactMe } from '@/components/landing/layouts/contact/contactComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function LandingPage () {
  const user = await prisma.user.findFirst()

  return <ContactMe userData={user} />
}
