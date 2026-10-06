import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wifi, Bell, Bath, ShieldCheck, Coffee, ChevronLeft, ChevronRight, Quote, ArrowRight, Calendar, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { DatePicker, Select, ConfigProvider, theme, App } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import heroSuite from "@/assets/hero-suite.jpg";
import aboutHotel from "@/assets/about-hotel.jpg";
import roomSuperior from "@/assets/room-superior.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomJunior from "@/assets/room-junior.jpg";
import roomBath from "@/assets/room-bath.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Better — Luxury Hotel & Suites" },
      { name: "description", content: "Discover Better — a boutique luxury hotel with signature suites, curated amenities and refined hospitality." },
      { property: "og:title", content: "Better — Luxury Hotel & Suites" },
      { property: "og:description", content: "Book your stay in one of our signature suites." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    location: null
  });

  const heroSlides = [
    {
      image: heroSuite,
      eyebrow: "Treasured Moments",
      title: <>Suite<br/>Collection</>
    },
    {
      image: roomDeluxe,
      eyebrow: "Signature Living",
      title: <>Deluxe<br/>Experience</>
    },
    {
      image: roomSuperior,
      eyebrow: "Elegance Defined",
      title: <>Superior<br/>Comfort</>
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleBookNow = () => {
    // Navigate to rooms page with booking details as search params
    navigate({
      to: "/rooms",
      search: (prev) => ({
        ...prev,
        checkIn: bookingData.checkIn ? bookingData.checkIn.format("YYYY-MM-DD") : undefined,
        checkOut: bookingData.checkOut ? bookingData.checkOut.format("YYYY-MM-DD") : undefined,
        location: bookingData.location || undefined,
      }),
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-cream overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 pt-4 pb-16 grid md:grid-cols-12 gap-8 relative min-h-[640px]">
          {/* Left title panel */}
          <div className="md:col-span-4 flex flex-col justify-between pt-16 pb-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="eyebrow">{heroSlides[currentSlide].eyebrow}</div>
                <h1 className="mt-6 font-serif text-6xl md:text-7xl leading-[0.95] text-foreground">
                  {heroSlides[currentSlide].title}
                </h1>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              <button
                onClick={prevSlide}
                aria-label="prev"
                className="h-11 w-11 border border-[#946244] text-[#946244] flex items-center justify-center hover:bg-[#946244] hover:text-white transition duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="next"
                className="h-11 w-11 bg-[#946244] text-white flex items-center justify-center hover:bg-[#7a5138] transition duration-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="md:col-span-8 relative h-[560px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={heroSlides[currentSlide].image}
                alt="Signature suite"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Booking card floats */}
            <div className="md:absolute md:-bottom-8 md:right-6 bg-ink text-white p-6 w-full md:w-[320px] mt-6 md:mt-0 shadow-2xl z-20">
              <div className="text-center">
                <div className="eyebrow">Rooms & Suites</div>
                <h3 className="mt-1 font-serif text-2xl">Hotel Booking</h3>
              </div>

              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#946244',
                    colorBgContainer: 'rgba(255, 255, 255, 0.1)',
                    colorBorder: 'transparent',
                    colorTextPlaceholder: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <DatePicker
                      placeholder="Check In"
                      suffixIcon={<Calendar className="h-4 w-4 text-white/50" />}
                      className="w-full bg-white/10 border-none hover:bg-white/20 text-white h-12 rounded-none"
                      format="DD . MMMM YYYY"
                      onChange={(date) => setBookingData(prev => ({ ...prev, checkIn: date }))}
                    />
                  </div>

                  <div className="relative">
                    <DatePicker
                      placeholder="Check Out"
                      suffixIcon={<Calendar className="h-4 w-4 text-white/50" />}
                      className="w-full bg-white/10 border-none hover:bg-white/20 text-white h-12 rounded-none"
                      format="DD . MMMM YYYY"
                      onChange={(date) => setBookingData(prev => ({ ...prev, checkOut: date }))}
                    />
                  </div>

                  <div className="relative">
                    <Select
                      placeholder="Choose a location"
                      className="w-full h-12 rounded-none"
                      variant="borderless"
                      suffixIcon={<MapPin className="h-4 w-4 text-white/50" />}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      options={[
                        { value: 'london', label: 'London, UK' },
                        { value: 'paris', label: 'Paris, France' },
                        { value: 'new-york', label: 'New York, USA' },
                      ]}
                      onChange={(val) => setBookingData(prev => ({ ...prev, location: val }))}
                    />
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="btn-gold btn-gold-hover w-full mt-2 py-4 font-bold tracking-[0.2em] transition-all duration-300 shadow-lg shadow-black/20"
                  >
                    Book Now
                  </button>
                </div>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">The Better Luxury Hotel</div>
          <h2 className="mt-3 font-serif text-4xl">Better's B'n'B Amenities</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground">
            Tempora ipsum natus at vel recentior nec charl nihil quo sit exhibiturum
            ad sed diu esperit adipiscing elit, sed do eiusmod.
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-10">
            {[
              { Icon: Wifi, label: "Fast WiFi" },
              { Icon: Bell, label: "Alarm" },
              { Icon: Bath, label: "Bath" },
              { Icon: ShieldCheck, label: "Safe" },
              { Icon: Coffee, label: "Coffee" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <Icon className="h-10 w-10 text-gold" strokeWidth={1.2} />
                <span className="text-sm tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMFORT / ABOUT */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-6 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 hidden md:block">
            <img src={roomJunior} alt="comfort" className="w-full h-72 object-cover rounded-2xl shadow-xl" width={400} height={600} loading="lazy" />
          </div>
          <div className="md:col-span-6 bg-ink text-white p-12 md:p-16 relative">
            <div className="eyebrow">About Us</div>
            <h2 className="mt-3 font-serif text-4xl">Your Comfort is Our<br/>Main Priority</h2>
            <p className="mt-6 text-sm text-white/70 leading-relaxed">
              Tempora ipsum natus at vel recentior nec charl nihil quo sit exhibiturum
              ad sed diu esperit adipiscing elit, sed do eiusmod. Consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
            <div className="mt-8 text-sm text-white/80">
              Booking and Reservation? <a href="tel:+1234567900" className="text-gold hover:underline transition-all">+123 45679 00</a>
            </div>
            <Link to="/about" className="btn-gold btn-gold-hover mt-6 inline-block">Know More</Link>
          </div>
          <div className="md:col-span-3 hidden md:block">
            <img src={aboutHotel} alt="hotel" className="w-full h-72 object-cover" width={900} height={1200} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ROOMS GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <div className="eyebrow">Luxury Rooms</div>
              <h2 className="mt-3 font-serif text-4xl">Luxury Rooms & Suites</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore magna aliqua. Ut enim ad minim veniam.
              </p>
              <Link
                to="/rooms"
                className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-[#946244] border border-[#946244]/30 px-8 py-4 hover:bg-[#946244] hover:text-white transition-all duration-300"
              >
                See All Suites
              </Link>
            </div>
            {[
              { img: "/images/jpeg/room-1.jpeg", name: "Presidential Suite", price: "$850", type: "Premium" },
              { img: "/images/jpeg/room-2.jpeg", name: "Superior Bed Rooms", price: "$250", type: "Standard" },
              { img: "/images/jpeg/room-3.jpeg", name: "Deluxe Family Rooms", price: "$550", type: "Family" },
              { img: "/images/jpeg/room-4.jpeg", name: "Junior Suite", price: "$350", type: "Suite" },
              { img: "/images/jpeg/room-5.jpeg", name: "Executive Bath", price: "$180", type: "Utility" },
              { img: "/images/jpeg/room-6.jpeg", name: "Grand Lobby Suite", price: "$720", type: "Luxury" },
            ].map((r, i) => (
              <Link
                key={i}
                to="/rooms"
                className={`relative ${i === 0 ? "md:col-span-8" : "md:col-span-4"} group overflow-hidden rounded-xl shadow-lg block`}
              >
                <img src={r.img} alt={r.name} className="w-full h-80 object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1">{r.type}</div>
                  <div className="font-serif text-3xl mb-1">{r.name}</div>
                  <div className="text-sm font-light tracking-widest">{r.price} <span className="opacity-70">| Night</span></div>
                </div>
                <div className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold duration-300">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXQUISITE HOSPITALITY */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">What People Say</div>
          <h2 className="mt-3 font-serif text-4xl">Exquisite Hospitality</h2>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 mt-12 grid md:grid-cols-2 gap-6">
          <div className="relative bg-ink-soft text-white p-12 min-h-[450px] flex items-end rounded-2xl overflow-hidden group">
            <img
              src="/images/jpeg/room-11.jpeg"
              alt="Superior Room"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="font-serif text-5xl">Superior Bed Rooms</div>
              <div className="mt-3 text-white/70 text-sm tracking-widest uppercase">Space | View | Amenities</div>
            </div>
          </div>
          <div className="bg-cream p-10 relative">
            <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-widest text-muted-foreground">
              <div>From</div><div>Rooms</div><div>Size</div><div>Price</div>
              <div className="text-foreground font-medium">$620</div>
              <div className="text-foreground font-medium">2</div>
              <div className="text-foreground font-medium">130m²</div>
              <div className="text-foreground font-medium">$820</div>
            </div>
            <div className="mt-6 border-t border-border pt-6 grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Bed</div><div>King size</div>
              <div className="text-muted-foreground">Capacity</div><div>2 Persons</div>
              <div className="text-muted-foreground">View</div><div>Garden</div>
              <div className="text-muted-foreground">Amenities</div><div>WiFi, TV, Minibar</div>
            </div>
            <Link to="/rooms" className="btn-gold btn-gold-hover mt-8 inline-block text-center">See Room</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">What Our Clients Say</div>
          <h2 className="mt-3 font-serif text-4xl">Words Of Our Clients</h2>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 mt-12 grid md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-cream p-10 relative">
              <Quote className="h-8 w-8 text-gold" />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                I love everything that put together for my baby's shower! Just thought her house
                and my baby's dad's family didn't keep. Get able to help me visualize the ways!
              </p>
              <div className="mt-6 eyebrow">Jane Cooper, USA</div>
            </div>
          ))}
        </div>
      </section>

      {/* SUPRIOR BED FULL BLEED */}
      <section className="bg-[#1a1612] text-white py-32 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[11px] tracking-[0.4em] uppercase">
            <div className="flex gap-3">
              <span className="text-[#946244]">View :</span>
              <span className="text-white/90">Garden</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#946244]">Capacity :</span>
              <span className="text-white/90">2 Persons</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#946244]">Size :</span>
              <span className="text-white/90">130m²</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#946244]">Price :</span>
              <span className="text-white/90">$820</span>
            </div>
          </div>
          <h2 className="mt-10 font-serif text-6xl md:text-8xl tracking-tight leading-none">
            Superior Bed Rooms
          </h2>

          {/* Subtle Decorative Line */}
          <div className="mt-12 flex justify-center">
            <div className="h-px w-24 bg-[#946244]/40" />
          </div>
        </div>

        {/* Background Texture/Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#946244]/10 via-transparent to-transparent" />
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="eyebrow">Better Hotel News</div>
          <h2 className="mt-3 font-serif text-4xl">Latest News Update</h2>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 mt-12 grid md:grid-cols-3 gap-6">
          {[
            { img: gallery1, date: "Jan 12, 2024" },
            { img: gallery2, date: "Jan 12, 2024" },
            { img: roomBath, date: "Jan 12, 2024" },
          ].map((n, i) => (
            <article key={i} className="group">
              <div className="overflow-hidden">
                <img src={n.img} alt="news" className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              </div>
              <div className="p-6 border border-t-0 border-border">
                <div className="text-xs text-muted-foreground tracking-widest">By Admin • {n.date}</div>
                <h3 className="mt-3 font-serif text-xl">Restore Lighting Design in The Hotel</h3>
                <Link
                  to="/news"
                  className="mt-4 inline-block text-[10px] uppercase tracking-widest text-[#946244] font-bold hover:text-white transition-colors duration-300"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
