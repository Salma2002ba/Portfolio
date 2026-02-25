import HeroContent from '../sub/HeroContent'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Background — motifs, blobs animés, palette bleu/rose/vert */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Blobs flous animés */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/[0.07] rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-1/3 right-10 w-56 h-56 bg-accent/[0.06] rounded-full blur-[100px] float-animation" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary/[0.06] rounded-full blur-[90px] animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-primary/[0.06] rounded-3xl blur-[60px] rotate-12 float-animation" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/[0.04] rounded-full blur-[110px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-secondary/[0.05] rounded-lg blur-[50px] rotate-45 animate-bounce" />
        <div className="absolute bottom-40 left-12 w-36 h-36 bg-primary/[0.05] rounded-full blur-[70px] float-animation" />

        {/* Grille (bleu en clair, cyan en sombre) */}
        <div className="absolute inset-0 opacity-90 bg-grid-hero" />
      </div>
      
      <HeroContent />
    </section>
  )
}

export default Hero
