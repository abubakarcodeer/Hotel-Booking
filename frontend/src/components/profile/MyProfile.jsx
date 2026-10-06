import { EditOutlined, ExclamationCircleFilled, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Descriptions, Image, Modal, Result, Skeleton, Tag, Tooltip, Upload, Avatar
} from 'antd';
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import { getSessionToken, setSessionUserKeyAgainstValue } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import { userStatusAsResponse } from '../../utils/responseAsStatus';
import ProfileEditModal from './ProfileEditModal';
import getImageUrl from '../../utils/imageUrl';

function MyProfile() {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const token = getSessionToken();

  // fetch user profile API data
  const [loading, error, response] = useFetchData('/api/v1/get-user');

  const user = response?.data;
  const avatarUrl = getImageUrl(user?.avatar);

  // handle to change user avatar upload
  const props = {
    accept: 'image/*',
    name: 'avatar',
    action: `${import.meta.env.VITE_API_BASE_URL}/api/v1/avatar-update`,
    method: 'put',
    headers: { authorization: `Bearer ${token}` },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        if (info?.file?.response?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', 'Your avatar has been updated successfully.');
          setSessionUserKeyAgainstValue('avatar', info?.file?.response?.result?.data?.avatar);
          window.location.reload();
        } else {
          notificationWithIcon('error', 'ERROR', 'Failed to update avatar.');
        }
      } else if (info.file.status === 'error') {
        notificationWithIcon('error', 'ERROR', 'An error occurred during upload.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result title='Failed to fetch profile' subTitle={error} status='error' />
        ) : (
          <div className="space-y-10">
            {/* Header / Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-black/5">
              <div className="relative group">
                <Avatar
                  size={140}
                  src={avatarUrl}
                  icon={<UserOutlined />}
                  className="border-4 border-white shadow-xl bg-[#946244]/10"
                />
                <div className="absolute bottom-1 right-1">
                  <Upload {...props}>
                    <Tooltip title='Change Avatar'>
                      <Button
                        icon={<EditOutlined />}
                        type='primary'
                        shape='circle'
                        className="bg-[#946244] border-none flex items-center justify-center shadow-lg"
                      />
                    </Tooltip>
                  </Upload>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-serif text-4xl mb-2">{user?.fullName}</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Tag color={user?.role === 'admin' ? 'gold' : 'blue'} className="uppercase tracking-widest text-[10px] font-bold px-3 py-0.5 rounded-full border-none">
                    {user?.role}
                  </Tag>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button onClick={() => setEditProfileModal(true)} className="btn-outline-ink !border-black/20 hover:!border-[#946244] hover:!text-[#946244] px-6 h-10 text-xs">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <ProfileDetail label="Email Address" value={user?.email} />
              <ProfileDetail label="Phone Number" value={user?.phone || 'N/A'} />
              <ProfileDetail label="Gender" value={user?.gender} className="capitalize" />
              <ProfileDetail label="Date of Birth" value={user?.dob?.split('T')[0]} />
            </div>

            <div className="pt-8 border-t border-black/5">
              <ProfileDetail label="Address" value={user?.address} />
            </div>

            <div className="pt-8 flex flex-col md:flex-row gap-6 text-[10px] tracking-widest uppercase text-muted-foreground opacity-60">
              <div>Member Since: {user?.createdAt?.split('T')[0]}</div>
              <div>Last Profile Update: {user?.updatedAt?.split('T')[0]}</div>
            </div>
          </div>
        )}
      </Skeleton>

      {editProfileModal && (
        <ProfileEditModal
          editProfileModal={editProfileModal}
          setEditProfileModal={setEditProfileModal}
        />
      )}
    </div>
  );
}

function ProfileDetail({ label, value, className = "" }) {
  return (
    <div>
      <div className="eyebrow !text-black/40 !text-[9px] mb-1">{label}</div>
      <div className={`text-base font-serif text-[#1a1612] ${className}`}>{value}</div>
    </div>
  );
}

export default React.memo(MyProfile);
