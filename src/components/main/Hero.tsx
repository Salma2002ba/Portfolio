import HeroContent from '../sub/HeroContent'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Background — motifs, blobs animés, palette bleu/rose/vert */}
      <div className="cyberpunk-diagonals absolute inset-0 -z-10 pointer-events-none">
        {/* Blobs flous animés */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/[0.07] rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-1/3 right-10 w-56 h-56 bg-accent/[0.06] rounded-full blur-[100px] float-animation" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary/[0.06] rounded-full blur-[90px] animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-primary/[0.06] rounded-3xl blur-[60px] rotate-12 float-animation" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/[0.04] rounded-full blur-[110px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-secondary/[0.05] rounded-lg blur-[50px] rotate-45 animate-bounce" />
        <div className="absolute bottom-40 left-12 w-36 h-36 bg-primary/[0.05] rounded-full blur-[70px] float-animation" />

        {/* Mode cyberpunk : formes supplémentaires animées (visibles uniquement en dark) */}
        <div className="absolute top-[15%] right-[20%] w-32 h-32 bg-primary/20 rounded-full blur-[60px] opacity-0 dark:opacity-100 cyberpunk-float-slow" aria-hidden />
        <div className="absolute bottom-[25%] left-[15%] w-40 h-40 bg-accent/15 rounded-full blur-[80px] opacity-0 dark:opacity-100 cyberpunk-pulse-glow" aria-hidden />
        <div className="absolute top-[60%] right-[8%] w-20 h-20 bg-secondary/20 rounded-lg blur-[40px] opacity-0 dark:opacity-100 cyberpunk-rotate-slow" aria-hidden />
        <div className="absolute top-[30%] left-[10%] w-28 h-28 bg-accent/15 rounded-full blur-[70px] opacity-0 dark:opacity-100 cyberpunk-drift" aria-hidden />
        <div className="absolute bottom-[15%] right-[25%] w-36 h-36 bg-primary/15 rounded-3xl blur-[75px] opacity-0 dark:opacity-100 cyberpunk-glow-breath" aria-hidden />
        <div className="absolute top-[45%] left-[25%] w-16 h-16 bg-secondary/25 rounded-full blur-[50px] opacity-0 dark:opacity-100 cyberpunk-float-slow" aria-hidden />

        {/* Grille (bleu en clair, cyan en sombre) */}
        <div className="absolute inset-0 opacity-90 bg-grid-hero" />
        {/* Mode cyberpunk : grille en défilement lent (dark only) */}
        <div className="cyberpunk-grid-flow absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none" aria-hidden />
      </div>
      
      <HeroContent />
    </section>
  )
}

export default Hero
