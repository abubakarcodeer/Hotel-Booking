import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero.jsx";
import { ReservationSidebar } from "@/components/ReservationSidebar.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import roomSuperior from "@/assets/room-superior.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomJunior from "@/assets/room-junior.jpg";
import roomBath from "@/assets/room-bath.jpg";

export const Route = createFileRoute("/reservation/review")({
  head: () => ({
    meta: [
      { title: "Reservation Reviews — Better" },
      { name: "description", content: "Read reviews and leave your own for our signature suites." },
    ],
  }),
  component: ReviewPage,
});

function Rating({ n = 4 }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? "fill-gold" : ""}`} strokeWidth={1.5} />
      ))}
    </span>
  );
}

function ReviewPage() {
  return (
    <>
      <PageHero title="Reservation" crumb="Reservation" />
      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="relative bg-muted h-[420px]">
              <button className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/80 rounded-full flex items-center justify-center"><ChevronLeft /></button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/80 rounded-full flex items-center justify-center"><ChevronRight /></button>
              <div className="absolute bottom-8 left-0 right-0 text-center text-white/80">
                <div className="font-serif text-3xl">Suprior Bed Rooms</div>
                <div className="mt-1"><span className="text-gold text-xl">$558</span> <span className="text-xs tracking-widest uppercase opacity-70">| Night</span></div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[roomDeluxe, roomJunior, roomBath, roomSuperior].map((t,i) => (
                <img key={i} src={t} alt="thumb" className="w-full h-24 object-cover" loading="lazy" />
              ))}
            </div>

            <div className="mt-8 flex gap-2 text-[11px] tracking-[0.25em] uppercase">
              <Link to="/reservation" className="px-6 py-3 border border-border">Rooms</Link>
              <button className="px-6 py-3 border border-border">Location</button>
              <button className="px-6 py-3 bg-gold text-white">Review</button>
            </div>

            <div className="mt-10">
              <h3 className="font-serif text-2xl">Reviews</h3>
              <div className="mt-3 text-5xl font-serif">0.0</div>
              <table className="mt-6 w-full text-sm border border-border">
                <tbody>
                  {["Rating","Grouped","Variable","External"].map(l => (
                    <tr key={l} className="border-b border-border last:border-0">
                      <td className="p-4 text-muted-foreground uppercase tracking-widest text-xs">{l}</td>
                      <td className="p-4 text-right">0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Post a Comment */}
            <div className="mt-12">
              <h3 className="font-serif text-2xl">Post a Comment</h3>
              <div className="mt-4 border-b border-border pb-4 text-sm text-muted-foreground">Post a Comment</div>

              <div className="mt-6 space-y-2 text-sm">
                {["Rating","Grouped","Variable","External"].map(l => (
                  <div key={l} className="flex items-center gap-4">
                    <span className="w-24 text-xs uppercase tracking-widest text-muted-foreground">{l}*</span>
                    <Rating n={l === "Variable" ? 5 : l === "Grouped" ? 3 : 4} />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <label className="font-serif text-lg">Comment</label>
                <textarea className="mt-3 w-full h-40 bg-muted p-4 outline-none focus:ring-1 focus:ring-gold" />
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <input placeholder="Name *" className="bg-muted p-4 outline-none focus:ring-1 focus:ring-gold" />
                <input placeholder="Email *" className="bg-muted p-4 outline-none focus:ring-1 focus:ring-gold" />
              </div>
              <input placeholder="Website" className="mt-4 w-full bg-muted p-4 outline-none focus:ring-1 focus:ring-gold" />

              <button className="btn-gold btn-gold-hover mt-6">Submit</button>
            </div>
          </div>

          <ReservationSidebar title="Your Reservation" showEmail showPrice ctaLabel="Check" />
        </div>
      </section>
    </>
  );
}
