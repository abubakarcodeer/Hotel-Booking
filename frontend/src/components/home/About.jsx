import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, GlassWater, Clock, Leaf } from 'lucide-react';
import { Link } from '@tanstack/react-router';

function About() {
  return (
    <section id='about' className='about-section'>
      <div className='about-container'>
        <div className='about-content-grid'>

          {/* Left: Image Side */}
          <div className='about-image-side'>
            <div className='about-image-wrapper'>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                src='https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                alt='Luxury Hotel Pool'
                className='about-main-image'
              />
              <div className='about-image-overlay-text'>
                <span>Luxury Stay</span>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className='about-decorative-leaf leaf-1'
              >
                 <Leaf size={48} strokeWidth={0.5} style={{ color: 'var(--primary)', opacity: 0.4 }} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className='about-decorative-leaf leaf-2'
              >
                 <Leaf size={32} strokeWidth={0.5} style={{ color: 'var(--primary)', opacity: 0.3 }} />
              </motion.div>
            </div>
          </div>

          {/* Right: Text Side */}
          <div className='about-text-side'>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
            >
              <p className='about-eyebrow'>THE BETTER LUXURY HOTEL</p>
              <h2 className='about-heading'>Stay with Comfort and Style</h2>
              <p className='about-description'>
                Experience the pinnacle of luxury and relaxation at Better. Our meticulously designed suites
                and world-class amenities ensure that every moment of your stay is filled with comfort and elegance.
                Whether you're here for business or leisure, we provide the perfect sanctuary.
              </p>
              <p className='about-description-secondary'>
                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud.
              </p>

              <div className='about-features'>
                <div className='about-feature-item'>
                  <div className='about-feature-icon'>
                    <Utensils size={32} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className='about-feature-title'>The Best Restaurants</h4>
                  </div>
                </div>
                <div className='about-feature-item'>
                  <div className='about-feature-icon'>
                    <GlassWater size={32} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className='about-feature-title'>The Best Cocktail bar</h4>
                  </div>
                </div>
              </div>

              <div className='about-footer'>
                <Link to='/rooms' className='btn-about-primary'>
                  Know About Us
                </Link>

                <div className='about-contact-info'>
                  <div className='about-contact-icon'>
                    <Clock size={20} />
                  </div>
                  <div className='about-contact-text'>
                    <span className='about-contact-label'>Booking Now</span>
                    <span className='about-contact-number'>123456789</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
