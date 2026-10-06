import { Modal, Descriptions, Avatar, Tag, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import React from 'react';
import getImageUrl from '../../utils/imageUrl';

function UserViewModal({ userViewModal, setUserViewModal }) {
  const user = userViewModal?.user;

  return (
    <Modal
      title="User Information"
      open={userViewModal?.open}
      onCancel={() => setUserViewModal({ open: false, user: null })}
      footer={null}
      width={700}
      centered
    >
      {user && (
        <div className="py-4">
          <div className="flex flex-col items-center mb-6">
            <Avatar
              size={120}
              src={getImageUrl(user?.avatar)}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-lg bg-gray-100"
            />
            <h2 className="mt-4 text-2xl font-serif">{user?.fullName}</h2>
            <Tag color={user?.role === 'admin' ? 'gold' : 'blue'} className="mt-1 uppercase tracking-widest text-[10px] font-bold">
              {user?.role}
            </Tag>
          </div>

          <Divider orientation="left">Contact Details</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={<span><MailOutlined className="mr-2" /> Email</span>}>
              {user?.email}
            </Descriptions.Item>
            <Descriptions.Item label={<span><PhoneOutlined className="mr-2" /> Phone</span>}>
              {user?.phone || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label={<span><HomeOutlined className="mr-2" /> Address</span>}>
              {user?.address || 'N/A'}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Personal Information</Divider>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label={<span><CalendarOutlined className="mr-2" /> Birthday</span>}>
              {user?.dob ? user.dob.split('T')[0] : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label={<span>{user?.gender === 'male' ? <ManOutlined className="mr-2" /> : <WomanOutlined className="mr-2" />} Gender</span>}>
              <span className="capitalize">{user?.gender || 'N/A'}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Joined" span={2}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
}

export default React.memo(UserViewModal);
