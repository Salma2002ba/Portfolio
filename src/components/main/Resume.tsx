'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { publicUrl } from '@/lib/utils'

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), { ssr: false })

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const ResumeSection = () => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs'
    })
  }, [])

  const onDocumentLoadError = (error: Error) => {
    setError(error.message)
  }

  return (
    <section
      id="resume"
      className="bg-background text-foreground px-6 py-14 flex flex-col items-center min-h-screen"
    >
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-6 relative z-10"
      >
        <h2 title={profile.resume.sectionTitle} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
          {profile.resume.sectionTitle}
        </h2>
        <p className="text-lg text-muted-foreground">
          {profile.resume.sectionDescription}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-card border border-border rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative w-full overflow-y-auto">
          {error ? (
            <p className="text-destructive text-center text-lg p-4">Échec du chargement du PDF : {error}</p>
          ) : (
            <Document
              file={publicUrl(profile.resume.filePath)}
              onLoadError={onDocumentLoadError}
              className="flex justify-center w-full"
            >
              <Page
                pageNumber={1}
                className="flex justify-center"
                renderTextLayer
                renderAnnotationLayer
                width={Math.min(890, typeof window !== 'undefined' ? window.innerWidth - 20 : 1200)}
                scale={1}
              />
            </Document>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default ResumeSection