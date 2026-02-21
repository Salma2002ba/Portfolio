import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/main/Footer'
import { Navbar } from '@/components/main/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { profile } from '@/data/profile'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.title} Portfolio`,
  description: profile.bio.join(' '),
  keywords: profile.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: profile.siteUrl,
    title: `${profile.name} - ${profile.title}`,
    description: profile.bio.join(' '),
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: `${profile.siteUrl}/profile-pic.png`,
        width: 1200,
        height: 630,
        alt: `${profile.name} - ${profile.title}`,
      },
    ],
  },
  alternates: {
    canonical: profile.siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio.join(' '),
    url: profile.siteUrl,
    image: `${profile.siteUrl}/profile-pic.png`,
    sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
    knowsAbout: profile.skills.map((s) => s.skill_name),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.contact.location,
    },
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={profile.siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <Navbar />
            <main role="main">
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
