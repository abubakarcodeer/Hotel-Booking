import {
  Descriptions, Image, List, Result, Skeleton, Tag, Typography, Card, Row, Col
} from 'antd';
import { HomeOutlined, DollarOutlined, ColumnHeightOutlined, TeamOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import { roomStatusAsResponse, roomTypeAsColor } from '../../utils/responseAsStatus';
import getImageUrl from '../../utils/imageUrl';

function RoomDetails({ id }) {
  // fetch room-details API data
  const [loading, error, response] = useFetchData(`/api/v1/get-room-by-id-or-slug-name/${id}`);

  const data = response?.data;

  return (
    <Skeleton loading={loading} paragraph={{ rows: 12 }} active avatar>
      {error ? (
        <Result
          title='Failed to fetch room details'
          subTitle={error}
          status='error'
        />
      ) : (
        <div className='space-y-6 animate-in fade-in duration-500'>
          {/* Hero Gallery */}
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-50'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='h-6 w-1 bg-color-primary rounded-full' />
              <h2 className='font-serif text-2xl tracking-[0.1em] uppercase text-bg-black m-0'>
                {data?.room_name}
              </h2>
              <Tag color={roomTypeAsColor(data?.room_type)} className='ml-4 uppercase py-1 px-4'>
                {data?.room_type}
              </Tag>
            </div>

            <Image.PreviewGroup>
              <Row gutter={[12, 12]}>
                {data?.room_images?.map((image, index) => (
                  <Col key={uniqueId()} xs={12} md={index === 0 ? 12 : 6} lg={index === 0 ? 8 : 4}>
                    <Image
                      className='rounded-xl object-cover hover:scale-[1.02] transition-transform cursor-zoom-in'
                      src={getImageUrl(image?.url)}
                      crossOrigin='anonymous'
                      alt='room-image'
                      width='100%'
                      height={index === 0 ? 320 : 150}
                    />
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className='rounded-2xl border-none shadow-sm h-full'>
                <Descriptions
                  title={(
                    <div className='flex items-center gap-2 mb-2'>
                      <InfoCircleOutlined className='text-color-primary' />
                      <span className='font-serif text-lg tracking-widest uppercase'>Specifications</span>
                    </div>
                  )}
                  column={2}
                  labelStyle={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 'bold' }}
                  contentStyle={{ color: '#1a1612', fontWeight: '600', paddingBottom: '24px' }}
                >
                  <Descriptions.Item label='Base Price'>
                    <div className='flex items-center gap-2 text-color-primary text-xl'>
                      <DollarOutlined />
                      {data?.room_price}
                      <span className='text-xs text-gray-400'>/ NIGHT</span>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Room Size'>
                    <div className='flex items-center gap-2'>
                      <ColumnHeightOutlined />
                      {data?.room_size} sq. ft.
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Max Occupancy'>
                    <div className='flex items-center gap-2'>
                      <TeamOutlined />
                      {data?.room_capacity} Guest(s)
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Status'>
                    <Tag
                      className='uppercase px-4'
                      color={roomStatusAsResponse(data?.room_status).color}
                    >
                      {roomStatusAsResponse(data?.room_status).level}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label='Policy Details' span={2}>
                    <div className='flex gap-4'>
                      <div className='flex items-center gap-2'>
                        <div className={`w-2 h-2 rounded-full ${data?.allow_pets ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className='text-xs uppercase tracking-widest'>Pets {data?.allow_pets ? 'Allowed' : 'Not Allowed'}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className={`w-2 h-2 rounded-full ${data?.provide_breakfast ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className='text-xs uppercase tracking-widest'>Breakfast {data?.provide_breakfast ? 'Included' : 'Not Included'}</span>
                      </div>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label='Full Description' span={2}>
                    <p className='text-gray-500 font-normal leading-relaxed text-sm m-0 bg-cream p-4 rounded-xl border border-color-primary/5'>
                      {data?.room_description}
                    </p>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <div className='space-y-6 h-full'>
                <Card className='rounded-2xl border-none shadow-sm'>
                  <div className='flex items-center gap-2 mb-6'>
                    <CheckCircleOutlined className='text-color-primary' />
                    <span className='font-serif text-lg tracking-widest uppercase'>Amenities</span>
                  </div>
                  <List
                    split={false}
                    dataSource={data?.extra_facilities}
                    renderItem={(item) => (
                      <List.Item className='!py-2 !px-0'>
                        <div className='flex items-center gap-3'>
                          <div className='w-1.5 h-1.5 rounded-full bg-color-primary' />
                          <Typography.Text className='!text-gray-600 font-medium tracking-wide'>
                            {item}
                          </Typography.Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>

                <Card className='rounded-2xl border-none shadow-sm bg-color-primary text-white'>
                  <div className='eyebrow !text-white/60 mb-2'>Asset Identity</div>
                  <div className='space-y-4'>
                    <div>
                      <div className='text-[0.6rem] uppercase tracking-widest opacity-60'>Internal Slug</div>
                      <div className='font-mono text-sm truncate'>{data?.room_slug}</div>
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <div className='text-[0.6rem] uppercase tracking-widest opacity-60'>Added</div>
                        <div className='text-xs font-bold'>{data?.created_at?.split('T')[0]}</div>
                      </div>
                      <div className='text-right'>
                        <div className='text-[0.6rem] uppercase tracking-widest opacity-60'>Last Update</div>
                        <div className='text-xs font-bold'>{data?.updated_at?.split('T')[0]}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Skeleton>
  );
}

export default React.memo(RoomDetails);
