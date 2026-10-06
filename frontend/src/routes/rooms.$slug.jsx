import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button, Modal, Skeleton, Empty, Result, Image, Divider, App } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import {
  ChevronLeft, ChevronRight, ChevronsRight, Star, Clock,
  MapPin, MessageCircle, Wifi, Coffee, ShieldCheck,
  Tv, Wind, Utensils, Info, CheckCircle2, XCircle
} from "lucide-react";
import { PageHero } from "@/components/PageHero.jsx";
import { ReservationSidebar } from "@/components/ReservationSidebar.jsx";
import OrderPlaceModal from '../components/utilities/OrderPlaceModal';
import RoomReviewList from '../components/utilities/RoomReviewList';
import ReviewAddModal from '../components/utilities/ReviewAddModal';
import useFetchData from '../hooks/useFetchData';
import { getSessionToken, getSessionUser } from '../utils/authentication';
import notificationWithIcon from '../utils/notification';

export const Route = createFileRoute("/rooms/$slug")({
  component: RoomPreview,
});

function RoomPreview() {
  const { modal } = App.useApp();
  const { slug } = Route.useParams();
  const [roomData, setRoomData] = useState({ data: null, loading: true, error: null });
  const [relatedRooms, setRelatedRooms] = useState([]);
  const [bookingModal, setBookingModal] = useState({ open: false, roomId: null });
  const [addReviewModal, setAddReviewModal] = useState({ open: false, bookingId: null });
  const [activeImage, setActiveImage] = useState(0);
  const [fetchAgain, setFetchAgain] = useState(false);
  const token = getSessionToken();
  const user = getSessionUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      setRoomData(prev => ({ ...prev, loading: true }));
      try {
        const serverUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${serverUrl}/api/v1/get-room-by-id-or-slug-name/${slug}`
        );
        const result = response?.data?.result?.data || response?.data?.result || null;
        setRoomData({ data: result, loading: false, error: null });

        // Fetch related rooms (all rooms and filter out current)
        const allRoomsRes = await axios.get(`${serverUrl}/api/v1/all-rooms-list?limit=4`);
        const allRooms = allRoomsRes?.data?.result?.data?.rows || [];
        setRelatedRooms(allRooms.filter(r => r.room_slug !== slug).slice(0, 3));
      } catch (err) {
        setRoomData({
          data: null,
          loading: false,
          error: err?.response?.data || { message: err?.message || 'Unknown error' }
        });
      }
    };
    fetchRoom();
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch user bookings to check if they have an active `in-reviews` booking for this room
  const [bookingsLoading, bookingsError, bookingsResponse] = useFetchData(
    user && token ? `/api/v1/get-user-booking-orders?limit=100` : null,
    fetchAgain
  );

  const pendingReviewBooking = bookingsResponse?.data?.rows?.find(
    (b) => b?.room?.id === roomData?.data?.id && b?.booking_status === 'in-reviews'
  );

  const handleOrder = () => {
    if (roomData?.data?.room_status !== 'available') {
      notificationWithIcon('error', 'ERROR', 'This room is currently not available for booking.');
      return;
    }
    if (!token && !user) {
      notificationWithIcon('error', 'ERROR', 'Please Register/Login first to place an order.');
      navigate({ to: '/auth/login' });
    } else {
      setBookingModal({ open: true, roomId: roomData?.data?.id });
    }
  };

  const room = roomData.data;

  return (
    <>
      <PageHero title={room?.room_name || "Room Details"} crumb="Room Preview" />

      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Skeleton loading={roomData.loading} active paragraph={{ rows: 25 }}>
              {roomData.error ? (
                <Result status="error" title="Room not found" subTitle={roomData.error.message} />
              ) : !room ? (
                <Empty description="Room details are unavailable" />
              ) : (
                <>
                  {/* Gallery Section */}
                  <div className="group relative overflow-hidden bg-muted rounded-xl shadow-2xl">
                    <Image.PreviewGroup
                      items={room.room_images?.map(img => img.url)}
                    >
                      <Image
                        src={room.room_images?.[activeImage]?.url || `/images/jpeg/room-${(room.id % 12) + 1}.jpeg`}
                        alt={room.room_name}
                        className="w-full h-full object-cover aspect-[16/9]"
                        preview={{
                          mask: <div className="flex items-center gap-2"><ChevronsRight className="h-4 w-4" /> View Full Gallery</div>
                        }}
                      />
                    </Image.PreviewGroup>

                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                      <div className="font-serif text-5xl md:text-6xl tracking-tight">{room.room_name}</div>
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-1 text-gold">
                          {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] opacity-80 border-l border-white/30 pl-6">{room.room_type} Collection</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Thumbnails */}
                  {room.room_images?.length > 1 && (
                    <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {room.room_images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 ring-offset-2 ${activeImage === i ? 'ring-2 ring-gold scale-95 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        >
                          <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Highlights Grid */}
                  <div className="mt-12 bg-cream rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <HighlightItem icon={<MapPin />} label="Area" value={`${room.room_size} SQFT`} />
                    <HighlightItem icon={<Clock />} label="Guests" value={`${room.room_capacity} Persons`} />
                    <HighlightItem icon={<Info />} label="Price" value={`$${room.room_price}/Night`} />
                    <HighlightItem
                      icon={room.room_status === 'available' ? <CheckCircle2 className="text-green-600"/> : <XCircle className="text-red-500"/>}
                      label="Status"
                      value={room.room_status}
                      valueClass={room.room_status === 'available' ? 'text-green-600 capitalize' : 'text-red-500 capitalize'}
                    />
                  </div>

                  {/* Content Sections */}
                  <div className="mt-12 space-y-12">
                    {/* Description */}
                    <div>
                      <h3 className="font-serif text-3xl flex items-center gap-3">
                        Room Overview
                        <div className="h-px flex-1 bg-border ml-4" />
                      </h3>
                      <div className="mt-6 text-base text-muted-foreground leading-relaxed text-justify whitespace-pre-line">
                        {room.room_description}
                      </div>
                    </div>

                    {/* Amenities Enhanced */}
                    <div>
                      <h3 className="font-serif text-3xl flex items-center gap-3">
                        Luxury Amenities
                        <div className="h-px flex-1 bg-border ml-4" />
                      </h3>
                      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <AmenityItem icon={<Wifi />} text="Free High-Speed WiFi" />
                        <AmenityItem icon={<Wind />} text="Individually Air Conditioned" />
                        <AmenityItem icon={<Tv />} text="4K Smart TV with Netflix" />
                        <AmenityItem icon={<Utensils />} text="24/7 In-Room Dining" />
                        <AmenityItem icon={<Coffee />} text="Nespresso Coffee Machine" />
                        <AmenityItem icon={<ShieldCheck />} text="Electronic Safety Box" />
                        {room.provide_breakfast && <AmenityItem icon={<Utensils />} text="Complimentary Breakfast" active />}
                        {room.allow_pets && <AmenityItem icon={<CheckCircle2 />} text="Pet Friendly Environment" active />}
                        {room.extra_facilities?.map((f, i) => (
                          <AmenityItem key={i} icon={<ChevronsRight />} text={f} />
                        ))}
                      </div>
                    </div>

                    {/* Policies Section */}
                    <div className="bg-muted/30 rounded-2xl p-8 border border-border">
                      <h3 className="font-serif text-2xl mb-6">Policies & Rules</h3>
                      <div className="grid md:grid-cols-2 gap-8 text-sm">
                        <ul className="space-y-3">
                          <li className="flex justify-between border-b border-border/50 pb-2">
                            <span className="text-muted-foreground">Check-in</span>
                            <span className="font-medium text-foreground font-serif">14:00 PM</span>
                          </li>
                          <li className="flex justify-between border-b border-border/50 pb-2">
                            <span className="text-muted-foreground">Check-out</span>
                            <span className="font-medium text-foreground font-serif">11:00 AM</span>
                          </li>
                          <li className="flex justify-between border-b border-border/50 pb-2">
                            <span className="text-muted-foreground">Late Check-out</span>
                            <span className="font-medium text-gold font-serif">Subject to Availability</span>
                          </li>
                        </ul>
                        <div className="text-muted-foreground leading-relaxed italic text-xs">
                          * Cancellation policy: Full refund if cancelled 48 hours prior to arrival.
                          Pets are allowed only in designated "Pet Friendly" rooms. Smoking is strictly
                          prohibited inside the rooms.
                        </div>
                      </div>
                    </div>

                    {/* CTA Mobile Bar */}
                    <div className="lg:hidden sticky bottom-4 z-50 bg-ink p-4 rounded-xl shadow-2xl flex items-center justify-between text-white">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest opacity-70">Price from</div>
                        <div className="text-xl font-serif text-gold">${room.room_price}<span className="text-xs text-white">/night</span></div>
                      </div>
                      <button
                        onClick={handleOrder}
                        disabled={room.room_status !== 'available'}
                        className="btn-gold px-8 py-3 text-sm h-fit"
                      >
                        {room.room_status === 'available' ? 'Book Now' : 'Sold Out'}
                      </button>
                    </div>

                    {/* Reviews */}
                    <div className="pt-8">
                      <div className="flex items-center justify-between border-b border-border pb-6 mb-10">
                        <h3 className="font-serif text-3xl">Guest Reviews</h3>
                        <div className="flex items-center gap-4">
                          <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-bold flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" /> 4.9
                          </div>
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">32 Reviews</span>
                        </div>
                      </div>

                      {pendingReviewBooking && (
                        <div className="mb-10 p-6 bg-cream border border-gold/20 rounded-xl flex items-center justify-between">
                          <div className="text-sm font-serif">You stayed here recently. Tell others what you thought!</div>
                          <button
                            onClick={() => setAddReviewModal({ open: true, bookingId: pendingReviewBooking.id })}
                            className="text-xs uppercase tracking-widest text-gold underline font-bold"
                          >
                            Write Review
                          </button>
                        </div>
                      )}

                      <RoomReviewList
                        roomId={room.id}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                      />
                    </div>
                  </div>
                </>
              )}
            </Skeleton>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
              <ReservationSidebar
                title="Your Reservation"
                ctaLabel={room?.room_status === 'available' ? "Check Availability" : "Room Unavailable"}
                showPrice={!!room}
                roomPrice={room?.room_price}
                disabled={room?.room_status !== 'available'}
                onCTA={handleOrder}
              />

              {/* Related Rooms */}
              {relatedRooms.length > 0 && (
                <div className="hidden lg:block">
                  <h4 className="font-serif text-xl mb-6">Similar Rooms</h4>
                  <div className="space-y-4">
                    {relatedRooms.map((r) => (
                      <Link
                        key={r.id}
                        to="/rooms/$slug"
                        params={{ slug: r.room_slug }}
                        className="flex gap-4 group cursor-pointer"
                      >
                        <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={r.room_images?.[0]?.url || `/images/jpeg/room-${(r.id % 12) + 1}.jpeg`}
                            alt={r.room_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h5 className="text-sm font-serif group-hover:text-gold transition">{r.room_name}</h5>
                          <div className="text-gold text-sm mt-1">${r.room_price} <span className="text-[10px] text-muted-foreground">/NIGHT</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {bookingModal.open && (
        <OrderPlaceModal
          bookingModal={bookingModal}
          setBookingModal={setBookingModal}
        />
      )}

      {addReviewModal.open && (
        <ReviewAddModal
          addReviewModal={addReviewModal}
          setAddReviewModal={setAddReviewModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </>
  );
}

function HighlightItem({ icon, label, value, valueClass = "" }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-xl text-gold shadow-sm">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{label}</div>
        <div className={`font-serif text-base font-medium ${valueClass}`}>{value}</div>
      </div>
    </div>
  );
}

function AmenityItem({ icon, text, active = false }) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${active ? 'bg-gold/5 border-gold/20' : 'bg-transparent border-border hover:border-gold/30'}`}>
      <div className={`text-gold flex-shrink-0 ${active ? 'scale-110' : ''}`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <span className={`text-xs tracking-wide ${active ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{text}</span>
    </div>
  );
}

