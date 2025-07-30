'use client'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { AboutSection } from '@/components/landing/layouts/about/aboutSection'
import React from 'react'
import { ScrollToSection } from '@/features/landing/ScrollToSection'
import { ChevronUp } from 'lucide-react'

export function AboutMe ({ hero, experience, education, skills }) {
  useDocumentTitle('About Me')

  return (
    <React.Fragment>
      {/* Introduction Section */}
      <AboutSection
        id='introduction'
        title='James Dev'
        imagePosition='left'
        items={hero}
        itemsSkill={skills}
        type='hero'
        ScrollTo={
          <ScrollToSection
            targetId='experience'
            label='Scroll down or click this label to view experience'
          />
        }
      />

      {/* Work Experience */}
      <AboutSection
        id='experience'
        title='Work Experience'
        items={experience}
        itemsEducation={education}
        type='experience'
        ScrollBack={
          <ScrollToSection
            targetId='introduction'
            label='Scroll up or click this label to view introduction again'
            icon={ChevronUp}
          />
        }
      />
    </React.Fragment>
  )
}
