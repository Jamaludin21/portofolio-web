import { ContactMe } from '@/components/landing/layouts/contact/contactComp'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function LandingPage () {
  // const hero = await prisma.hero.findFirst({
  //   where: { isPublished: true }
  // })

  return <ContactMe />
}
