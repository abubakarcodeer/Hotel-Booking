import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, App
} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../utils/apiService';
import { setSessionUserAndToken } from '../utils/authentication';
import Logo from '../components/shared/Logo';

const LOGIN_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';

function Login() {
  window.document.title = 'Better — Login';
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);

  // function to handle user login
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await ApiService.post('/api/v1/auth/login?loginType=admin', values);

      if (response?.result_code === 0) {
        setSessionUserAndToken(response?.result?.data, response?.access_token, response?.refresh_token);
        notification.success({
          message: 'SUCCESS',
          description: 'Welcome to Better Luxury Hotel Admin Panel'
        });
        window.location.href = '/';
      } else {
        notification.error({
          message: 'FAILED',
          description: response?.result?.message || 'Login failed'
        });
      }
    } catch (error) {
      notification.error({
        message: 'ERROR',
        description: error?.response?.data?.result?.message || error?.response?.data?.result?.error || error?.message || 'Sorry! Something went wrong. App server error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className='flex flex-col h-screen items-center justify-center bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${LOGIN_BG})` }}
    >
      {/* Dark Overlay with subtle blur */}
      <div className='absolute inset-0 bg-bg-black/40 backdrop-blur-[2px]' />

      <div className='relative z-10 w-[90%] md:w-[500px] bg-[#1a1612]/90 backdrop-blur-xl p-10 md:p-14 rounded-2xl shadow-2xl border border-white/10'>
        <div className='text-center mb-10 flex flex-col items-center'>
          <Link to='/' className='mb-8 hover:opacity-80 transition-opacity'>
            <Logo iconSize={40} />
          </Link>
          <div className='eyebrow text-color-primary'>
            Authorized Personnel Only
          </div>
          <h2 className='mt-2 font-serif text-4xl text-white uppercase tracking-wider'>
            Admin Login
          </h2>
          <div className='mt-4 h-px w-12 bg-color-primary mx-auto' />
        </div>

        <Form
          name='better-login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size='large'
          layout='vertical'
        >
          <Form.Item
            name='email'
            rules={[{
              type: 'email',
              required: true,
              message: 'Please input your Email!'
            }]}
          >
            <Input
              prefix={<MailOutlined className='text-color-primary mr-2' />}
              placeholder='Email Address'
              className='!bg-white/5 !border-white/10 !text-white hover:!border-color-primary focus:!border-color-primary h-14 rounded-md'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!'
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className='text-color-primary mr-2' />}
              placeholder='Password'
              className='!bg-white/5 !border-white/10 !text-white hover:!border-color-primary focus:!border-color-primary h-14 rounded-md'
            />
          </Form.Item>

          {/* FORM SUBMIT BUTTON */}
          <Form.Item className='mt-8'>
            <Button
              className='w-full h-14 bg-color-primary border-none text-white font-bold tracking-[0.2em] uppercase hover:!bg-color-secondary transition-all rounded-md flex items-center justify-center'
              disabled={loading}
              loading={loading}
              htmlType='submit'
            >
              {loading ? '' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <style>
        {`
          .eyebrow {
            font-family: 'Poppins', sans-serif;
            font-size: 0.72rem;
            font-weight: 400;
            letter-spacing: 0.35em;
            text-transform: uppercase;
          }
          .ant-input-affix-wrapper-focused {
            box-shadow: 0 0 0 2px rgba(148, 98, 68, 0.1) !important;
          }
          .ant-input::placeholder {
            color: rgba(255, 255, 255, 0.3) !important;
          }
          .ant-form-item-explain-error {
            font-size: 12px;
            margin-top: 4px;
          }
        `}
      </style>
    </section>
  );
}

export default React.memo(Login);
