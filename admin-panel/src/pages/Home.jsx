import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/shared/Logo';

const HOME_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';

function Home() {
  window.document.title = 'Better — Admin Home';

  return (
    <div
      className='h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${HOME_BG})` }}
    >
      {/* Dark overlay for readability */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]' />

      <div className='relative z-10 text-center space-y-8 max-w-2xl px-4 flex flex-col items-center'>
        <Logo iconSize={60} textColor='white' className='mb-4 scale-125' />

        <div className='eyebrow text-color-primary mt-8 drop-shadow-md'>
          Authorized Personnel Only
        </div>

        <h1 className='text-5xl md:text-7xl font-serif text-white leading-tight uppercase tracking-tight drop-shadow-lg'>
          Admin Panel
        </h1>

        <p className='text-gray-200 font-body-font text-lg max-w-md mx-auto leading-relaxed drop-shadow-md'>
          Welcome to the heart of premium hospitality management. Control and monitor your hotel operations with ease.
        </p>

        <div className='pt-8'>
          <Link to='/main/dashboard'>
            <button
              type='button'
              className='bg-white text-bg-black px-12 py-5 uppercase tracking-[0.3em] text-xs font-bold hover:bg-color-primary hover:text-white transition-all duration-500 shadow-2xl rounded-sm group overflow-hidden relative'
            >
              <span className='relative z-10'>Go to Dashboard</span>
              <div className='absolute inset-0 bg-color-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
