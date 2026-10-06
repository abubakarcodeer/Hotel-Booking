import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero.jsx";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

export const Route = createFileRoute("/team/")({
  head: () => ({
    meta: [
      { title: "Our Team — Better Luxury Hotel" },
      { name: "description", content: "Meet the expert people behind Better." },
    ],
  }),
  component: TeamPage,
});

const MEMBERS = [
  { name: "Michael Dean", img: team1, slug: "michael-dean" },
  { name: "Cameron Williamson", img: team2, slug: "cameron-williamson" },
  { name: "Ralph Edwards", img: team3, slug: "ralph-edwards" },
  { name: "Jane Cooper", img: team4, slug: "jane-cooper" },
  { name: "Wade Warren", img: team5, slug: "wade-warren" },
  { name: "Jacob Jones", img: team6, slug: "jacob-jones" },
];

function TeamPage() {
  return (
    <>
      <PageHero title="Our Team" crumb="Our Team" />
      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MEMBERS.map(m => (
            <Link
              to="/team/$slug"
              params={{ slug: m.slug }}
              key={m.slug}
              className="relative group overflow-hidden bg-ink-soft"
            >
              <img src={m.img} alt={m.name} className="w-full h-[440px] object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-gold opacity-0 group-hover:opacity-100 transition">
                <Facebook className="h-4 w-4" />
                <Twitter className="h-4 w-4" />
                <Linkedin className="h-4 w-4" />
                <Instagram className="h-4 w-4" />
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="font-serif text-2xl">{m.name}</div>
                <div className="text-xs tracking-widest uppercase text-white/70 mt-1">| Event Planner</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
