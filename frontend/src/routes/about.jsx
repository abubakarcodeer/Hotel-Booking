import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero.jsx";
import { Utensils, Wine, Plane, Coffee, Bed, Bell, Quote, Facebook, Twitter, Linkedin, Instagram, ChevronLeft, ChevronRight, Play, Wifi } from "lucide-react";
import aboutHotel from "@/assets/about-hotel.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Better Luxury Hotel" },
      { name: "description", content: "The story behind Better — refined hospitality, curated amenities and expert people." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        crumb="About"
        image="/images/jpeg/defaultBcg2.jpg"
      />

      {/* Intro */}
      <section className="py-24">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={aboutHotel} alt="Luxury room" className="w-full h-[520px] object-cover" loading="lazy" />
            <button className="absolute top-4 right-4 h-14 w-14 bg-gold text-white flex items-center justify-center hover:opacity-90" aria-label="play">
              <Play className="h-5 w-5" />
            </button>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-center text-xs tracking-[0.4em] uppercase text-foreground/70">
              Luxury Room
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Provide additional resources such as readings, articles, videos, or online tutorials for
              learners who want to explore the details further. Sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Utensils className="h-8 w-8 text-gold" strokeWidth={1.2} />
                <div className="text-sm">The Best<br/>Restaurants</div>
              </div>
              <div className="flex items-center gap-3">
                <Wine className="h-8 w-8 text-gold" strokeWidth={1.2} />
                <div className="text-sm">The Best<br/>Cocktail bar</div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <button className="btn-outline-ink">Know About Us</button>
              <div className="text-sm">
                <div className="eyebrow">Booking Now</div>
                <div className="text-gold mt-1">1 2 3 4 5 6 7 8 9</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special features dark card */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="bg-ink text-white p-14 md:p-20 relative">
            <div className="eyebrow">Special Features & Facilities</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Experience Luxury At<br/>Our Hotel</h2>
            <div className="mt-16 space-y-3 text-lg">
              <div className="text-white/80"># 2 Pools</div>
              <div className="text-gold"># 3 Fitness Center</div>
              <div className="text-white/80"># 2 Restaurants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel facilities */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">Stay in Our Luxury</div>
          <h2 className="mt-3 font-serif text-4xl">Hotel Facilities</h2>
        </div>
        <div className="mx-auto max-w-[1300px] px-6 mt-12 grid md:grid-cols-3 gap-6">
          {[
            { Icon: Plane, label: "Airport Pickup" },
            { Icon: Coffee, label: "Complimentary Breakfast" },
            { Icon: Wine, label: "Premium Cocktail Bar" },
            { Icon: Wifi, label: "High-Speed WiFi" },
            { Icon: Bed, label: "Luxury Swimming Pool" },
            { Icon: Bell, label: "24/7 Room Service" },
          ].map(({ Icon, label }, i) => (
            <div key={i} className={`p-8 border ${i === 1 ? "border-dashed border-gold shadow-lg shadow-gold/5" : "border-border"} bg-white hover:border-gold transition-colors duration-300`}>
              <Icon className="h-10 w-10 text-gold" strokeWidth={1.2} />
              <h3 className="mt-4 font-serif text-xl">{label}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial huge */}
      <section className="py-24 text-center">
        <div className="eyebrow">Testimonial</div>
        <h2 className="mt-3 font-serif text-[7vw] md:text-[100px] leading-none">TESTIMONIAL</h2>
        <div className="mx-auto max-w-[900px] px-6 mt-8">
          <div className="text-gold text-lg tracking-widest">★ ★ ★ ★ ★</div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button className="text-muted-foreground hover:text-gold"><ChevronLeft /></button>
            <p className="text-lg italic max-w-2xl">
              "Been there with my family. Beautiful place, definitely recommended.
              Children also enjoyed it very much."
            </p>
            <button className="text-muted-foreground hover:text-gold"><ChevronRight /></button>
          </div>
          <div className="mt-4 eyebrow">Jane Cooper, USA</div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">Better Services</div>
          <h2 className="mt-3 font-serif text-4xl">Expert Team Persons</h2>
        </div>
        <div className="mx-auto max-w-[1300px] px-6 mt-12 grid md:grid-cols-3 gap-6">
          {[
            { name: "Michael Dean", img: team1 },
            { name: "Cameron Williamson", img: team2 },
            { name: "Ralph Edwards", img: team3 },
          ].map(m => (
            <div key={m.name} className="relative group overflow-hidden bg-ink-soft">
              <img src={m.img} alt={m.name} className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-gold opacity-0 group-hover:opacity-100 transition">
                <Facebook className="h-4 w-4" /><Twitter className="h-4 w-4" /><Linkedin className="h-4 w-4" /><Instagram className="h-4 w-4" />
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="font-serif text-xl">{m.name}</div>
                <div className="text-xs tracking-widest uppercase text-white/70 mt-1">| Event Planner</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
