import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero.jsx";
import { Facebook, Twitter, Linkedin, Instagram, CheckCircle2 } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import roomBath from "@/assets/room-bath.jpg";

export const Route = createFileRoute("/team/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${prettyName(params?.slug)} — Better Team` },
      { name: "description", content: "Meet one of our expert team members at Better." },
    ],
  }),
  component: TeamDetail,
});

function prettyName(slug) {
  if (!slug) return "Team Member";
  return slug.split("-").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}

const IMG_MAP = {
  "michael-dean": team1,
  "cameron-williamson": team2,
  "ralph-edwards": team3,
  "jane-cooper": team4,
  "wade-warren": team5,
  "jacob-jones": team6,
};

function TeamDetail() {
  const { slug } = Route.useParams();
  const img = IMG_MAP[slug] ?? team5;
  const name = prettyName(slug);

  return (
    <>
      <PageHero title={name} crumb="Team Member" />
      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-2 gap-16">
          <div>
            <img src={img} alt={name} className="w-full h-[560px] object-cover" loading="lazy" />
          </div>
          <div>
            <h1 className="font-serif text-4xl">{name}</h1>
            <div className="eyebrow mt-1">Architect</div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, an has justo simul nominati. Sea te latine detrastu.
              Eum id omnis delectus. At dolores appetere sit, quo ubique splendide definitionem an,
              ut molestie offendit sapientem mea. Nihil voluptatibus cum ne, nam ad dicta graeci
              equidem. Semper audire consulatu mea at, aliquam epicurei ut eum. Ad malis dissentias
              delicatissimi his, et labore accusam duo.
            </p>
            <div className="mt-6 flex items-center gap-4 text-foreground/70">
              <Facebook className="h-4 w-4" /><Twitter className="h-4 w-4" /><Linkedin className="h-4 w-4" /><Instagram className="h-4 w-4" />
            </div>

            <div className="mt-10">
              <div className="font-serif text-2xl">Education &</div>
              <div className="mt-2 h-px w-16 bg-gold" />
              <ul className="mt-4 space-y-2 text-sm">
                {["Graduation In Architecture From YALE University","Post Graduation In Architecture From USA","Diploma In Landscape Design From JNU"].map(e => (
                  <li key={e} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-gold" strokeWidth={1.5} /> {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="font-serif text-2xl">Awards</div>
              <div className="mt-2 h-px w-16 bg-gold" />
              <ul className="mt-4 space-y-2 text-sm">
                {["Best Design Award 2021","Best Design Award 2020","Best Design Award 2018"].map(e => (
                  <li key={e} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-gold" strokeWidth={1.5} /> {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1300px] px-6 text-center">
          <h2 className="font-serif text-4xl">Latest Projects</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[gallery1, gallery2, roomBath].map((p, i) => (
              <img key={i} src={p} alt="project" className="w-full h-64 object-cover" loading="lazy" />
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, an has justo simul nominati. Sea te latine detrastu. Eum id
            omnis delectus. At dolores appetere sit, quo ubique splendide definitionem an,
            ut molestie offendit sapientem mea. Nihil voluptatibus cum ne, nam ad dicta graeci equidem.
          </p>
        </div>
      </section>
    </>
  );
}
