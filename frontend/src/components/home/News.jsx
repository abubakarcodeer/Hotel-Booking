import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Calendar, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Top 10 Romantic Getaways for 2024',
    date: 'March 15, 2024',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    slug: 'romantic-getaways'
  },
  {
    id: 2,
    title: 'The Secret to a Perfect Spa Day',
    date: 'February 28, 2024',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    slug: 'perfect-spa-day'
  },
  {
    id: 3,
    title: 'Exploring Local Cuisine: Seafood Special',
    date: 'February 10, 2024',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
    slug: 'local-cuisine'
  }
];

function News() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id='news' className='news-section' style={{ padding: '8rem 1rem', background: 'white' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <p className='section-eyebrow' style={{ textAlign: 'left' }}>LATEST NEWS</p>
            <h2 className='section-heading' style={{ textAlign: 'left' }}>Our Blog & Insights</h2>
          </div>
          <Link to='/' className='featured-rooms-view-all'>
            <span>View All News</span>
            <div className='featured-rooms-view-all-line' />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem'
        }}>
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden', borderRadius: '4px', marginBottom: '1.5rem' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '0.4rem 1rem',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '600'
                }}>
                  {item.category}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                lineHeight: '1.3',
                marginBottom: '1.5rem',
                color: 'var(--dark)'
              }}>
                {item.title}
              </h3>

              <Link
                to='/'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--dark)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.15em',
                  marginTop: 'auto'
                }}
              >
                Read More <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;
