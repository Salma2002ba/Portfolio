import { BlogsSection } from '@/components/main/Blogs'
import ContactUs from '@/components/main/ContactUs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import CertificationsSection from '@/components/main/Certifications'
import { AnalyticsDebug } from '@/components/analytics/AnalyticsDebug'
import InteractiveWrapper from '@/components/main/InteractiveWrapper'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.title} Portfolio`,
  description: profile.bio.join(' '),
  alternates: {
    canonical: profile.siteUrl,
  },
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen" >
      {/* Hidden SEO content for better indexing */}
      <div className="sr-only">
        <h1>{profile.name} - {profile.title} Portfolio</h1>
        <p>
          {profile.bio.join(' ')} Browse my projects, skills, and professional experience.
        </p>
      </div>

      <InteractiveWrapper>
        <Hero />
        <Skills />
        <ResumeSection />
        <Timeline />
        {/* <CertificationsSection /> */}
        <Projects />
        <BlogsSection />
        <ContactUs />
        <Toaster position="bottom-right" />
      </InteractiveWrapper>
      
      {/* Temporary test components for analytics - remove in production */}
      {/* <AnalyticsDebug /> */}
    </div>
  )
}
