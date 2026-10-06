import { FileProtectOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator=',' />;

function BookingCard({ loading, data }) {
  const navigate = useNavigate();

  return (
    <Card
      loading={loading}
      onClick={() => navigate('/main/booking-orders')}
      className='rounded-xl border-none shadow-sm hover:shadow-md transition-all cursor-pointer group'
      title={(
        <div className='flex items-center gap-3 py-1'>
          <div className='p-2 bg-color-primary/10 rounded-lg text-color-primary group-hover:bg-color-primary group-hover:text-white transition-colors'>
            <FileProtectOutlined className='text-xl' />
          </div>
          <span className='font-serif text-lg tracking-widest uppercase text-bg-black'>
            Reservations
          </span>
        </div>
      )}
    >
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Total</span>}
            value={data?.total_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a1612' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Pending</span>}
            value={data?.pending_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#f59e0b' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Approved</span>}
            value={data?.approved_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#45d175' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Completed</span>}
            value={data?.completed_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#946244' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>In Review</span>}
            value={data?.in_reviews_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Rejected</span>}
            value={data?.rejected_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#ff0000' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Cancelled</span>}
            value={data?.cancel_bookings || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#ff0000' }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default BookingCard;
