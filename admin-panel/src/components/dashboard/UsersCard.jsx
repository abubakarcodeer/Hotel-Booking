import { TeamOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator=',' />;

function UsersCard({ loading, data }) {
  const navigate = useNavigate();

  return (
    <Card
      loading={loading}
      onClick={() => navigate('/main/users')}
      className='rounded-xl border-none shadow-sm hover:shadow-md transition-all cursor-pointer group'
      title={(
        <div className='flex items-center gap-3 py-1'>
          <div className='p-2 bg-color-primary/10 rounded-lg text-color-primary group-hover:bg-color-primary group-hover:text-white transition-colors'>
            <TeamOutlined className='text-xl' />
          </div>
          <span className='font-serif text-lg tracking-widest uppercase text-bg-black'>
            Users Overview
          </span>
        </div>
      )}
    >
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Total</span>}
            value={data?.total_users || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a1612' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Admins</span>}
            value={data?.admin_role_user || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600', color: '#946244' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={<span className='text-[0.65rem] uppercase tracking-wider text-gray-400'>Guests</span>}
            value={data?.user_role_user || 0}
            formatter={formatter}
            valueStyle={{ fontSize: '1.5rem', fontWeight: '600' }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default UsersCard;
