import { ExclamationCircleFilled, SafetyCertificateOutlined, UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Button, Descriptions, Image, Modal, Result, Skeleton, Tag, Card, Row, Col
} from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import AvatarImg from '../../assets/images/avatar.png';
import useFetchData from '../../hooks/useFetchData';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import { getSessionUser } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import { userStatusAsResponse } from '../../utils/responseAsStatus';
import getImageUrl from '../../utils/imageUrl';

const { confirm } = Modal;

function UserDetails({ id }) {
  const dispatch = useDispatch();
  const user = getSessionUser();

  // fetch user-details API data
  const [loading, error, response] = useFetchData(`/api/v1/get-user/${id}`);
  const data = response?.data;

  return (
    <Skeleton loading={loading} paragraph={{ rows: 12 }} active avatar>
      {error ? (
        <Result
          title='Failed to fetch user'
          subTitle={error}
          status='error'
        />
      ) : (
        <div className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
          <Card className='rounded-2xl border-none shadow-sm overflow-hidden mb-6'>
            <div className='flex flex-col md:flex-row items-center gap-8 py-4'>
              <div className='relative'>
                <div className='w-28 h-28 rounded-full border-4 border-gray-50 overflow-hidden shadow-xl flex items-center justify-center bg-gray-50'>
                  {data?.avatar ? (
                    <Image
                      className='w-full h-full object-cover'
                      src={getImageUrl(data?.avatar)}
                      crossOrigin='anonymous'
                      alt='user-image'
                      fallback={AvatarImg}
                    />
                  ) : (
                    <UserOutlined className='text-4xl text-gray-300' />
                  )}
                </div>
              </div>

              <div className='text-center md:text-left flex-grow'>
                <h2 className='text-3xl font-serif font-bold tracking-wider mb-2 uppercase text-bg-black'>
                  {data?.fullName}
                </h2>
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-3'>
                  <Tag color={data?.role === 'admin' ? 'magenta' : 'purple'} className='m-0 uppercase tracking-widest px-3'>
                    {data?.role}
                  </Tag>
                </div>
              </div>

              {user?.id !== id && (
                <div className='flex gap-4'>
                </div>
              )}
            </div>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className='rounded-2xl border-none shadow-sm h-full'>
                <Descriptions
                  title={(
                    <div className='flex items-center gap-2 mb-6'>
                      <div className='h-6 w-1 bg-color-primary rounded-full' />
                      <span className='font-serif text-lg tracking-widest uppercase'>Contact Information</span>
                    </div>
                  )}
                  column={2}
                  labelStyle={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 'bold' }}
                  contentStyle={{ color: '#1a1612', fontWeight: '600', paddingBottom: '24px' }}
                >
                  <Descriptions.Item label='Email'>
                    <div className='flex items-center gap-2'>
                      <MailOutlined className='text-color-primary' />
                      {data?.email}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Phone'>
                    <div className='flex items-center gap-2'>
                      <PhoneOutlined className='text-color-primary' />
                      {data?.phone}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Birthday'>
                    <div className='flex items-center gap-2'>
                      <CalendarOutlined className='text-color-primary' />
                      {data?.dob?.split('T')[0] || 'N/A'}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Permanent Address' span={2}>
                    <div className='flex items-center gap-2'>
                      <GlobalOutlined className='text-color-primary' />
                      {data?.address}
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card className='rounded-2xl border-none shadow-sm h-full'>
                <div className='flex items-center gap-2 mb-8'>
                  <div className='h-6 w-1 bg-color-primary rounded-full' />
                  <span className='font-serif text-lg tracking-widest uppercase'>Meta Details</span>
                </div>

                <div className='space-y-6'>
                  <div className='p-4 bg-gray-50 rounded-xl'>
                    <span className='text-[0.6rem] text-gray-400 uppercase tracking-[0.2em] block mb-2 font-bold'>Record ID</span>
                    <span className='text-xs font-mono text-gray-600 break-all'>{id}</span>
                  </div>

                  <div className='flex justify-between items-end border-t border-gray-100 pt-6'>
                    <div>
                      <span className='text-[0.6rem] text-gray-400 uppercase tracking-widest block mb-1'>Join Date</span>
                      <span className='text-sm font-bold text-bg-black'>{data?.createdAt?.split('T')[0]}</span>
                    </div>
                    <div className='text-right'>
                      <span className='text-[0.6rem] text-gray-400 uppercase tracking-widest block mb-1'>Last Modified</span>
                      <span className='text-sm font-bold text-bg-black'>{data?.updatedAt?.split('T')[0]}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Skeleton>
  );
}

export default React.memo(UserDetails);
