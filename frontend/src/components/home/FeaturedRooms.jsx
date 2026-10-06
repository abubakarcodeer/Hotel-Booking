/**
 * @name Hotel Room Booking System
 * @description Premium FeaturedRooms Component - Merged from new UI design
 * Keeps real API data from backend, wraps with new premium card styling
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { v4 as uniqueId } from 'uuid';

import { Star, Bed } from 'lucide-react';

function RoomCard({ room, index }) {
  const imageUrl = room?.room_images?.[0]?.url || `/images/jpeg/room-${(index % 12) + 1}.jpeg`;
  const roomName = room?.room_name || 'Luxury Suite';
  const roomPrice = room?.room_price || '—';
  const roomSlug = room?.room_slug || '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='room-card-v2'
    >
      <Link
        to="/rooms/$slug"
        params={{ slug: room?.room_slug || room?.id?.toString() }}
        className='room-card-v2-link'
      >
        <div className='room-card-v2-img-wrap'>
          <img src={imageUrl} alt={roomName} className='room-card-v2-img' />
          <div className='room-card-v2-overlay' />

          <div className='room-card-v2-content'>
            <h3 className='room-card-v2-name'>{roomName}</h3>
            <div className='room-card-v2-footer'>
               <span className='room-card-v2-price'>${roomPrice} <span>/ NIGHT</span></span>
            </div>

            <div className='room-card-v2-meta'>
               <div className='room-card-v2-beds'>
                 <Bed size={14} />
                 <span>2 King Bed</span>
               </div>
               <div className='room-card-v2-stars'>
                 {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} fill='currentColor' />)}
               </div>
            </div>
          </div>

          <div className='room-card-v2-btn-circle'>
            <span>Book</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedRooms({ featuredRoom }) {
  return (
    <div className='featured-rooms-v2-container'>
      <div className='featured-rooms-v2-grid'>
        {featuredRoom?.slice(0, 3).map((room, index) => (
          <RoomCard key={uniqueId()} room={room} index={index} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedRooms;
