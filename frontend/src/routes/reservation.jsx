import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero.jsx";
import { ReservationSidebar } from "@/components/ReservationSidebar.jsx";
import { ChevronsRight, Search, BedDouble, CalendarCheck } from "lucide-react";
import React from 'react';

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reservation — Better Luxury Hotel" },
      { name: "description", content: "Reserve your room — pick from our signature collection." },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  return (
    <>
      <PageHero
        title="Reservations"
        crumb="Reservation"
        image="/images/jpeg/room-12.jpeg"
      />

      <section className="py-24 bg-cream/20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="grid lg:grid-cols-3 gap-16 items-start">

            <div className="lg:col-span-2 space-y-16">
              <div>
                <div className="eyebrow !text-[#946244]">Step 1</div>
                <h2 className="mt-2 font-serif text-4xl text-[#1a1612]">How to Book Your Stay</h2>
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <StepCard
                    icon={<Search />}
                    title="Choose Your Room"
                    text="Explore our signature collection of luxury suites and find the one that perfectly matches your desires."
                  />
                  <StepCard
                    icon={<CalendarCheck />}
                    title="Select Your Dates"
                    text="Pick your preferred arrival and departure dates. We offer flexible stays and premium services."
                  />
                  <StepCard
                    icon={<BedDouble />}
                    title="Confirm & Pay"
                    text="Review your selection, provide your payment details via UPI, and receive instant booking confirmation."
                  />
                </div>
              </div>

              <div className="bg-[#1a1612] p-12 rounded-2xl shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                   <h3 className="text-white font-serif text-3xl mb-6">Ready to Experience Luxury?</h3>
                   <p className="text-white/60 mb-10 max-w-lg leading-relaxed">
                     Our curated suites are designed for those who appreciate the finer things in life.
                     From intimate couple retreats to grand presidential experiences.
                   </p>
                   <Link to="/rooms" className="btn-gold !bg-[#946244] hover:!bg-[#7a5138] px-10 py-5 transition-all">
                     View All Available Rooms
                   </Link>
                 </div>
                 <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <CalendarCheck size={300} />
                 </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl mb-8">Reservation Policies</h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm text-muted-foreground leading-relaxed">
                   <div className="flex gap-4">
                      <ChevronsRight className="h-5 w-5 text-[#946244] shrink-0" />
                      <p><strong className="text-foreground">Cancellation:</strong> Free cancellation up to 48 hours before check-in date. Late cancellations may incur a fee.</p>
                   </div>
                   <div className="flex gap-4">
                      <ChevronsRight className="h-5 w-5 text-[#946244] shrink-0" />
                      <p><strong className="text-foreground">Check-in:</strong> Standard check-in time is 2:00 PM. Early check-in is subject to availability.</p>
                   </div>
                   <div className="flex gap-4">
                      <ChevronsRight className="h-5 w-5 text-[#946244] shrink-0" />
                      <p><strong className="text-foreground">Check-out:</strong> Guests are requested to vacate their rooms by 11:00 AM.</p>
                   </div>
                   <div className="flex gap-4">
                      <ChevronsRight className="h-5 w-5 text-[#946244] shrink-0" />
                      <p><strong className="text-foreground">Pets:</strong> We are a pet-friendly hotel! Please notify us in advance if you're bringing a pet.</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <ReservationSidebar
                title="Pick Your Room"
                ctaLabel="Browse Collection"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function StepCard({ icon, title, text }) {
  return (
    <div className="p-8 bg-white border border-gold/10 rounded-xl shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-500">
       <div className="h-12 w-12 bg-cream rounded-lg flex items-center justify-center text-[#946244] mb-6">
         {React.cloneElement(icon, { size: 24 })}
       </div>
       <h4 className="font-serif text-xl mb-3">{title}</h4>
       <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
