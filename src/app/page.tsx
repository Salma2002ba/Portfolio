import About from '@/components/main/About'
import { BlogsSection } from '@/components/main/Blogs'
import ContactUs from '@/components/main/ContactUs'
import Education from '@/components/main/Education'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import LanguesSoftSkillsInterets from '@/components/main/LanguesSoftSkillsInterets'
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
      {/* Contenu masqué pour SEO / accessibilité — un seul H1 visible (hero) */}
      <div className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]" aria-hidden>
        <p>{profile.bio.join(' ')} Projets, compétences et parcours professionnel.</p>
      </div>

      <InteractiveWrapper>
        <Hero />
        <About />
        <ResumeSection />
        <Education />
        <Timeline />
        <Skills />
        <LanguesSoftSkillsInterets />
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
