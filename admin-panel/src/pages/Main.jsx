import {
  DashboardOutlined, FileProtectOutlined, FullscreenExitOutlined, FullscreenOutlined, HomeOutlined, LogoutOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Button, Layout, Menu, Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserBox from '../components/shared/UserBox';
import Dashboard from '../components/tabs/Dashboard';
import MyProfile from '../components/tabs/MyProfile';
import Orders from '../components/tabs/Orders';
import Rooms from '../components/tabs/Rooms';
import Users from '../components/tabs/Users';
import useFullScreen from '../hooks/useFullScreen';
import ApiService from '../utils/apiService';
import { removeSessionAndLogoutUser } from '../utils/authentication';
import notificationWithIcon from '../utils/notification';
import Logo from '../components/shared/Logo';

const {
  Header, Content, Footer, Sider
} = Layout;

function Main() {
  window.document.title = 'Better — Main';
  const { isFullscreen, toggleFullScreen } = useFullScreen();
  const [selectedKeys, setSelectedKeys] = useState('1');
  const navigate = useNavigate();
  const { tab } = useParams();

  // function to handle user logout
  const userLogout = async () => {
    try {
      const response = await ApiService.post('/api/v1/auth/logout');
      if (response?.result_code === 0) {
        removeSessionAndLogoutUser();
      } else {
        notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        removeSessionAndLogoutUser();
      }
    } catch (error) {
      notificationWithIcon('error', 'ERROR', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      removeSessionAndLogoutUser();
    }
  };

  const handleTabChange = (key) => {
    switch (key) {
      case '1': {
        navigate('/main/dashboard');
        break;
      }
      case '2': {
        navigate('/main/users');
        break;
      }
      case '3': {
        navigate('/main/hotel-rooms');
        break;
      }
      case '4': {
        navigate('/main/booking-orders');
        break;
      }
      case '5': {
        navigate('/main/profile');
        break;
      }
      case '6': {
        userLogout();
        break;
      }
      default: {
        navigate('/main/dashboard');
      }
    }
  };

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'dashboard': {
          setSelectedKeys('1');
          break;
        }
        case 'users': {
          setSelectedKeys('2');
          break;
        }
        case 'hotel-rooms': {
          setSelectedKeys('3');
          break;
        }
        case 'booking-orders': {
          setSelectedKeys('4');
          break;
        }
        case 'profile': {
          setSelectedKeys('5');
          break;
        }
        case 'logout': {
          setSelectedKeys('6');
          break;
        }
        default: {
          navigate('/not-found');
        }
      }
    }
  }, [tab, navigate]);

  useEffect(() => {
    switch (selectedKeys) {
      case '1': {
        window.document.title = 'Better — Dashboard';
        break;
      }
      case '2': {
        window.document.title = 'Better — Users';
        break;
      }
      case '3': {
        window.document.title = 'Better — Hotel Rooms';
        break;
      }
      case '4': {
        window.document.title = 'Better — Booking Orders';
        break;
      }
      case '5': {
        window.document.title = 'Better — Profile';
        break;
      }
      case '6': {
        window.document.title = 'Better — Logout';
        break;
      }
      default: {
        window.document.title = 'Better — Dashboard';
      }
    }
  }, [selectedKeys]);

  return (
    <Layout className='w-full h-screen'>
      <Sider
        width={260}
        breakpoint='lg'
        collapsedWidth='0'
        className='!bg-[#1a1612] border-r border-white/5'
      >
        <div className='py-8 px-6 border-b border-white/5 mb-4'>
          <Logo iconSize={32} />
        </div>

        <UserBox />

        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            handleTabChange(e.key);
          }}
          className='!bg-transparent border-none px-2 mt-4'
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard'
            },
            {
              key: '2',
              icon: <TeamOutlined />,
              label: 'Users'
            },
            {
              key: '3',
              icon: <HomeOutlined />,
              label: 'Hotel Rooms'
            },
            {
              key: '4',
              icon: <FileProtectOutlined />,
              label: 'Booking Orders'
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: 'My Profile'
            },
            {
              key: '6',
              icon: <LogoutOutlined />,
              label: 'Logout'
            }
          ]}
        />
      </Sider>

      <Layout className='bg-[#fdfbf7]'>
        <Header className='px-8 !bg-white border-b border-gray-100 flex items-center justify-between'>
          <div className='eyebrow text-gray-400'>
            Management Console
          </div>

          {/* full screen toggle button */}
          <Tooltip title='Click to toggle Full Screen' placement='left'>
            <Button
              className='hover:!border-color-primary hover:!text-color-primary'
              icon={isFullscreen ?
                (<FullscreenExitOutlined />) :
                (<FullscreenOutlined />)}
              onClick={toggleFullScreen}
              shape='circle'
              type='default'
              size='large'
            />
          </Tooltip>
        </Header>

        <Content className='bg-[#fdfbf7] overflow-y-auto m-0 p-8'>
          {selectedKeys === '1' && (<Dashboard />)}
          {selectedKeys === '2' && (<Users />)}
          {selectedKeys === '3' && (<Rooms />)}
          {selectedKeys === '4' && (<Orders />)}
          {selectedKeys === '5' && (<MyProfile />)}
        </Content>

        <Footer className='text-center font-text-font font-medium bg-[#fdfbf7] text-gray-400 py-6 border-t border-gray-100'>
          ©2026 BETTER LUXURY HOTEL — ALL RIGHTS RESERVED
        </Footer>
      </Layout>

      <style>
        {`
          .ant-menu-dark.ant-menu-inline .ant-menu-item {
            height: 50px;
            line-height: 50px;
            margin-bottom: 8px;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.6);
          }
          .ant-menu-dark.ant-menu-inline .ant-menu-item-selected {
            background-color: rgba(148, 98, 68, 0.15) !important;
            color: #946244 !important;
          }
          .ant-menu-item .anticon {
            font-size: 1.1rem;
          }
          .ant-layout-sider-trigger {
            background: #1a1612 !important;
          }
        `}
      </style>
    </Layout>
  );
}

export default React.memo(Main);
