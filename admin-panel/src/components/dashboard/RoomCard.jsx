import { HomeOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator=',' />;

function RoomCard({ loading, data }) {
  const navigate = useNavigate();

  return (
    <Card
      loading={loading}
      onClick={() => navigate('/main/hotel-rooms')}
      className='rounded-xl border-none shadow-sm hover:shadow-md transition-all cursor-pointer group'
      title={(
        <div className='flex items-center gap-3 py-1'>
          <div className='p-2 bg-color-primary/10 rounded-lg text-color-primary group-hover:bg-color-primary group-hover:text-white transition-colors'>
            <HomeOutlined className='text-xl' />
          </div>
          <span className='font-serif text-lg tracking-widest uppercase text-bg-black'>
            Rooms Inventory
          </span>
        </div>
      )}
    >
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Total Inventory</span>}
            value={data?.total_rooms || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.8rem', fontWeight: '600', color: '#1a1612' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Available Now</span>}
            value={data?.available_rooms || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.8rem', fontWeight: '600', color: '#45d175' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Currently Booked</span>}
            value={data?.booked_rooms || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.8rem', fontWeight: '600', color: '#946244' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Maintenance/Out</span>}
            value={data?.unavailable_rooms || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.8rem', fontWeight: '600', color: '#ff0000' }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default RoomCard;
