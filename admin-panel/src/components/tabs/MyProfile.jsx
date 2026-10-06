import { EditOutlined, UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Button, Descriptions, Image, Result, Skeleton, Tag, Tooltip, Upload, Card, Row, Col
} from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import AvatarImg from '../../assets/images/avatar.png';
import useFetchData from '../../hooks/useFetchData';
import { getSessionToken, setSessionUserKeyAgainstValue } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import getImageUrl from '../../utils/imageUrl';
import ProfileEditModal from '../shared/ProfileEditModal';

function MyProfile() {
  const token = getSessionToken();
  const [editProfileModal, setEditProfileModal] = useState(false);

  // fetch user profile API data
  const [loading, error, response] = useFetchData('/api/v1/get-user');

  // handle to change user avatar upload
  const props = {
    accept: 'image/*',
    name: 'avatar',
    action: `${import.meta.env.VITE_API_BASE_URL}/api/v1/avatar-update`,
    method: 'put',
    headers: { authorization: `Bearer ${token}` },
    onChange(info) {
      if (info.file.status === 'done') {
        // Handle response from API
        if (info?.file?.response?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', info?.file?.response?.result?.message || 'Your avatar change successful');
          // update local storage session user data
          setSessionUserKeyAgainstValue('avatar', info?.file?.response?.result?.data?.avatar);
          window.location.reload();
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        }
      } else if (info.file.status === 'error') {
        notificationWithIcon('error', 'ERROR', info?.file?.response?.result?.error || 'Sorry! Something went wrong. App server error');
      }
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <Skeleton loading={loading} paragraph={{ rows: 15 }} active avatar>
        {error ? (
          <Result
            title='Failed to fetch'
            subTitle={error}
            status='error'
          />
        ) : (
          <div className='space-y-6'>
            {/* Header Section */}
            <div className='bg-[#1a1612] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl'>
              <div className='absolute right-0 top-0 opacity-10 scale-150 pointer-events-none'>
                <UserOutlined style={{ fontSize: '300px' }} />
              </div>

              <div className='flex flex-col md:flex-row items-center gap-8 relative z-10'>
                <div className='relative group'>
                  <div className='w-32 h-32 rounded-full border-4 border-[#946244] overflow-hidden shadow-2xl'>
                    {response?.data?.avatar ? (
                      <Image
                        className='w-full h-full object-cover'
                        src={getImageUrl(response?.data?.avatar)}
                        crossOrigin='anonymous'
                        alt='user-image'
                        fallback={AvatarImg}
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-800 flex items-center justify-center text-4xl'>
                        {response?.data?.fullName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className='absolute -bottom-2 -right-2'>
                    <ImgCrop grid rotate>
                      <Upload {...props} showUploadList={false}>
                        <Tooltip title='Change Avatar'>
                          <Button
                            className='!bg-[#946244] !border-none !text-white hover:!scale-110 transition-transform'
                            icon={<EditOutlined />}
                            shape='circle'
                            size='large'
                          />
                        </Tooltip>
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>

                <div className='text-center md:text-left flex-grow'>
                  <div className='eyebrow !text-[#946244]/80 mb-2'>
                    Administrator Profile
                  </div>
                  <h1 className='text-4xl font-serif font-bold tracking-wider mb-2 uppercase'>
                    {response?.data?.fullName}
                  </h1>
                  <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4'>
                    <Tag color='gold' className='m-0 uppercase tracking-widest px-3 py-1 font-bold'>
                      {response?.data?.role}
                    </Tag>
                  </div>
                </div>

                <Button
                  onClick={() => setEditProfileModal(true)}
                  className='!h-12 !px-8 bg-[#946244] border-none text-white font-bold tracking-widest uppercase hover:!bg-[#7a5138] transition-all rounded-md shadow-lg'
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Information Grid */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <Card className='rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow'>
                  <Descriptions
                    title={(
                      <div className='flex items-center gap-2 mb-6'>
                        <div className='h-6 w-1 bg-[#946244] rounded-full' />
                        <span className='font-serif text-xl tracking-widest uppercase'>Core Information</span>
                      </div>
                    )}
                    column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                    labelStyle={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 'bold' }}
                    contentStyle={{ color: '#1a1612', fontWeight: '600', fontSize: '1rem', paddingBottom: '20px' }}
                  >
                    <Descriptions.Item label='Full Name'>
                      {response?.data?.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Email Address'>
                      <div className='flex items-center gap-2'>
                        <MailOutlined className='text-[#946244]' />
                        {response?.data?.email}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label='Phone Number'>
                      <div className='flex items-center gap-2'>
                        <PhoneOutlined className='text-[#946244]' />
                        {response?.data?.phone || 'N/A'}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label='Date of Birth'>
                      <div className='flex items-center gap-2'>
                        <CalendarOutlined className='text-[#946244]' />
                        {response?.data?.dob?.split('T')[0] || 'N/A'}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label='Location' span={2}>
                      <div className='flex items-center gap-2'>
                        <GlobalOutlined className='text-[#946244]' />
                        {response?.data?.address}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card className='rounded-2xl border-none shadow-sm h-full hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-2 mb-8'>
                    <div className='h-6 w-1 bg-[#946244] rounded-full' />
                    <span className='font-serif text-xl tracking-widest uppercase'>Account History</span>
                  </div>

                  <div className='space-y-8'>
                    <div className='flex flex-col'>
                      <span className='text-[0.65rem] text-gray-400 uppercase tracking-widest mb-2 font-bold'>Registered On</span>
                      <span className='text-xl font-bold text-bg-black font-sans'>
                        {response?.data?.createdAt?.split('T')[0]}
                      </span>
                    </div>

                    <div className='flex flex-col'>
                      <span className='text-[0.65rem] text-gray-400 uppercase tracking-widest mb-2 font-bold'>Last Profile Update</span>
                      <span className='text-xl font-bold text-bg-black font-sans'>
                        {response?.data?.updatedAt?.split('T')[0]}
                      </span>
                    </div>

                    <div className='pt-6 border-t border-gray-100'>
                      <div className='bg-[#fdfbf7] p-4 rounded-xl border border-[#946244]/10'>
                        <p className='text-xs text-gray-500 leading-relaxed italic m-0'>
                          "This account is part of the elite administrative team of Better Luxury Hotel. All actions are logged for security."
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Skeleton>

      {/* profile edit modal component */}
      {editProfileModal && (
        <ProfileEditModal
          editProfileModal={editProfileModal}
          setEditProfileModal={setEditProfileModal}
        />
      )}
    </div>
  );
}

export default React.memo(MyProfile);
