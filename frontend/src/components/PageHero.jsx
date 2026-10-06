import { Link } from "@tanstack/react-router";

export function PageHero({ title, crumb, image = "/images/jpeg/defaultBcg.jpeg" }) {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* 1. Top Vignette - Helps blend with the black header and gives depth */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />

      {/* 2. Middle Overlay - Subtle darkening for text readability */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* 3. Bottom White Blend - As requested in screenshot (Tall and Smooth) */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/90 to-transparent z-10" />

      {/* Content Layer */}
      <div className="relative z-30 mx-auto max-w-[1400px] px-6 text-center mt-[-40px]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
          {/* Breadcrumbs */}
          <div className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-bold">
            <Link to="/" className="text-white hover:text-[#946244] transition-colors">Home</Link>
            <span className="mx-4 text-white/30">-</span>
            <span className="text-white/60">{crumb}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 font-serif text-5xl md:text-8xl text-[#1a1612] tracking-tighter leading-none">
            {title}
          </h1>

          {/* Decorative Bronze Line */}
          <div className="mt-12 flex justify-center">
            <div className="h-px w-24 bg-[#946244]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
