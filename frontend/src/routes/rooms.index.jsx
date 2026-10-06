import { createFileRoute, Link } from "@tanstack/react-router";
import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PageHero } from "@/components/PageHero.jsx";
import { ReservationSidebar } from "@/components/ReservationSidebar.jsx";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: [
      { title: "Room List — Better Luxury Hotel" },
      { name: "description", content: "Browse our signature rooms and suites — filter by amenity, price and availability." },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  const [roomsData, setRoomsData] = useState({ data: null, loading: true, error: null });
  const [sort, setSort] = useState('default');
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setRoomsData(prev => ({ ...prev, loading: true }));
      try {
        const serverUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${serverUrl}/api/v1/all-rooms-list`);
        // The API returns { result: { data: { rows: [...] } } } based on previous checks
        const rows = response?.data?.result?.data?.rows || response?.data?.result?.rows || [];
        setRoomsData({ data: rows, loading: false, error: null });
      } catch (err) {
        setRoomsData({
          data: null,
          loading: false,
          error: err?.response?.data || { message: err?.message || 'Unknown error' }
        });
      }
    };
    fetchRooms();
  }, []);

  const getFilteredAndSortedRooms = () => {
    if (!roomsData.data) return [];
    let rooms = [...roomsData.data];

    // Apply filters
    if (filters) {
      if (filters.adults) {
        rooms = rooms.filter(r => r.room_capacity >= (filters.adults + (filters.children || 0)));
      }
      if (filters.priceRange) {
        rooms = rooms.filter(r => r.room_price >= filters.priceRange[0] && r.room_price <= filters.priceRange[1]);
      }
      // Note: Backend doesn't support date availability filtering yet in this call,
      // but we could implement it if we had the booking data.
    }

    if (sort === 'price-low') return rooms.sort((a, b) => a.room_price - b.room_price);
    if (sort === 'price-high') return rooms.sort((a, b) => b.room_price - a.room_price);
    return rooms;
  };

  const filteredRooms = getFilteredAndSortedRooms();

  return (
    <>
      <PageHero
        title="Signature Collection"
        crumb="Our Rooms"
        image="/images/jpeg/room-10.jpeg"
      />

      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            {/* Sort tabs */}
            <div className="flex flex-wrap gap-3 text-[11px] tracking-[0.25em] uppercase mb-10">
              <button
                onClick={() => setSort('default')}
                className={`px-6 py-3 border transition-all duration-300 ${sort === 'default' ? 'bg-[#946244] text-white border-[#946244]' : 'border-border hover:border-[#946244] text-muted-foreground hover:text-[#946244]'}`}
              >
                Default
              </button>
              <button
                onClick={() => setSort('price-low')}
                className={`px-6 py-3 border transition-all duration-300 ${sort === 'price-low' ? 'bg-[#946244] text-white border-[#946244]' : 'border-border hover:border-[#946244] text-muted-foreground hover:text-[#946244]'}`}
              >
                Price Low
              </button>
              <button
                onClick={() => setSort('price-high')}
                className={`px-6 py-3 border transition-all duration-300 ${sort === 'price-high' ? 'bg-[#946244] text-white border-[#946244]' : 'border-border hover:border-[#946244] text-muted-foreground hover:text-[#946244]'}`}
              >
                Price High
              </button>
            </div>

            <Skeleton loading={roomsData.loading} active paragraph={{ rows: 15 }}>
              {roomsData.error ? (
                <Result status="error" title="Failed to fetch rooms" subTitle={roomsData.error.message} />
              ) : filteredRooms.length === 0 ? (
                <Empty description="No rooms found matching your criteria" />
              ) : (
                <div className="space-y-12">
                  {filteredRooms.map((r, i) => (
                    <article key={r.id} className="grid md:grid-cols-2 gap-8 group">
                      <div className="overflow-hidden bg-muted aspect-[4/3] rounded-lg shadow-sm">
                        <img
                          src={r.room_images?.[0]?.url || `/images/jpeg/room-${(i % 12) + 1}.jpeg`}
                          alt={r.room_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col justify-center text-right md:text-left">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{r.room_type} Suite</div>
                        <h3 className="font-serif text-3xl group-hover:text-gold transition-colors">{r.room_name}</h3>
                        <div className="mt-3 text-gold text-xl">
                          ${r.room_price}
                          <span className="text-muted-foreground text-xs tracking-widest uppercase ml-1">| Night</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {r.room_description}
                        </p>
                        <Link
                          to="/rooms/$slug"
                          params={{ slug: r.room_slug || r.id.toString() }}
                          className="mt-6 inline-block text-sm font-medium tracking-widest uppercase underline underline-offset-8 hover:text-gold transition-colors"
                        >
                          View Details & Book
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </Skeleton>

            {/* Pagination Placeholder */}
            {!roomsData.loading && filteredRooms.length > 0 && (
              <div className="mt-16 flex items-center gap-2">
                {["1", ">"].map((p, i) => (
                  <button
                    key={i}
                    className={`h-12 w-12 border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i === 0
                        ? "bg-[#946244] text-white border-[#946244] shadow-lg shadow-[#946244]/20"
                        : "bg-white text-[#946244] border-border hover:border-[#946244] hover:bg-[#946244] hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="sticky top-24 h-fit">
            <ReservationSidebar
              ctaLabel="Filter Results"
              showPriceFilter={true}
              onCTA={(data) => setFilters(data)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
