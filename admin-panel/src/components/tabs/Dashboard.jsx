import { Result } from 'antd';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookingCard from '../dashboard/BookingCard';
import RoomCard from '../dashboard/RoomCard';
import RevenueCard from '../dashboard/RevenueCard';
import UsersCard from '../dashboard/UsersCard';

function Dashboard() {
  // fetch dashboard API data
  const [loading, error, response] = useFetchData('/api/v1/dashboard');

  return (
    <div>
      <h2 className='text-[20px] text-center font-serif font-medium py-4 uppercase tracking-widest'>
        Welcome to Better Luxury Hotel — Dashboard
      </h2>

      {error ? (
        <Result
          title='Failed to fetch'
          subTitle={error}
          status='error'
        />
      ) : (
        <div className='flex flex-col gap-6'>
          {/* Main Revenue Highlight */}
          <RevenueCard
            loading={loading}
            data={response?.data?.revenue_info}
          />

          {/* Grid for other stats */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <UsersCard
              loading={loading}
              data={response?.data?.users_info}
            />

            <RoomCard
              loading={loading}
              data={response?.data?.rooms_info}
            />

            <BookingCard
              loading={loading}
              data={response?.data?.booking_info}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Dashboard);
