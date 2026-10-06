import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Valentina Smith',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Oliver Knight',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Sophia Thorne',
    role: 'Head of Housekeeping',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Julian Vane',
    role: 'Concierge Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  }
];

function Team() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id='team' className='team-section' style={{ padding: '8rem 1rem', background: '#F9F6F0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className='section-title-wrapper'>
          <p className='section-eyebrow'>OUR EXPERTS</p>
          <h2 className='section-heading'>Meet Our Team</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                background: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{member.name}</h4>
                <p style={{ color: 'var(--primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                  <FaFacebookF size={18} style={{ cursor: 'pointer' }} />
                  <FaTwitter size={18} style={{ cursor: 'pointer' }} />
                  <FaInstagram size={18} style={{ cursor: 'pointer' }} />
                  <FaLinkedinIn size={18} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
