'use client'

import { Variants, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegCopy,
  FaSpinner,
  FaUser,
} from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('Message envoyé avec succès !')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('Échec de l\'envoi. Veuillez réessayer.')
      }
    } catch {
      setStatus('Une erreur s\'est produite. Réessayez plus tard.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copié !`)
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  }

  const inputVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  }

  return (
    <section id="contact" className="relative py-14 bg-background text-foreground transition-colors overflow-hidden">
      {/* Motifs et blobs animés — palette bleu/rose/vert */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-12 w-40 h-40 bg-primary/[0.06] rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-60 right-16 w-28 h-28 bg-accent/[0.06] rounded-lg rotate-45 blur-[60px] animate-bounce" />
        <div className="absolute bottom-40 left-1/3 w-44 h-44 bg-primary/[0.05] rounded-full blur-[90px] float-animation" />
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-secondary/[0.06] rounded-lg rotate-12 blur-[50px] float-animation" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-accent/[0.04] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-16 w-36 h-36 bg-secondary/[0.05] rounded-full blur-[70px] float-animation" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="w-full md:w-1/2 space-y-4"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 title="Me contacter" className="text-4xl font-extrabold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Échangeons
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Un projet, une question ? Parlons infrastructure, CI/CD ou cloud — on concrétise vos idées.
              </p>

              <div className="space-y-4 text-foreground">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">{profile.contact.email}</span>
                  <button
                    title="Copier l'adresse e-mail"
                    onClick={() => copyToClipboard(profile.contact.email, 'E-mail')}
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copier l'e-mail"
                  >
                    <FaRegCopy />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <FaSquarePhone className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">{profile.contact.phone}</span>
                  <button
                    title="Copier le numéro de téléphone"
                    onClick={() => copyToClipboard(profile.contact.phone, 'Numéro de téléphone')}
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copier le numéro"
                  >
                    <FaRegCopy />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">{profile.contact.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 space-y-4"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de contact">
                {['name', 'email', 'subject'].map((field, i) => (
                  <motion.div
                    key={field}
                    custom={i}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative">
                      {field === 'name' && (
                        <FaUser className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      {field === 'email' && (
                        <FaEnvelope className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      {field === 'subject' && (
                        <MessageCircle className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field === 'name' ? 'Nom' : field === 'email' ? 'E-mail' : 'Sujet'}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 text-foreground rounded-none focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground transition-all"
                        required
                        aria-label={field}
                      />
                    </div>
                  </motion.div>
                ))}
                <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message…"
                    className="w-full pl-4 pr-4 py-3 bg-background/50 text-foreground rounded-none h-36 resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground transition-all"
                    required
                    aria-label="Message"
                  />
                </motion.div>
                <motion.button
                  title={isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                  type="submit"
                  className={cn(
                    buttonVariants({
                      className:
                        'w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary via-accent to-secondary text-white shadow-md hover:shadow-lg hover:opacity-95 border-0',
                    }),
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Envoi…
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Envoyer
                    </>
                  )}
                </motion.button>
                {status && (
                  <motion.p
                    className={`text-center text-sm ${
                      status.includes('succès') ? 'text-green-500' : 'text-red-500'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs
