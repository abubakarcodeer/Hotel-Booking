import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Form, Input, Button, Checkbox, App } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageHero } from "@/components/PageHero.jsx";
import ApiService from '../../utils/apiService';
import { setSessionUserAndToken } from '../../utils/authentication';
import { setAuth } from '../../store/slices/appSlice';

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/api/v1/auth/login', {
        email: values.email,
        password: values.password
      });

      if (response?.result_code === 0) {
        const user = response?.result?.data;
        const accessToken = response?.access_token;
        const refreshToken = response?.refresh_token;

        if (user && accessToken) {
          setSessionUserAndToken(user, accessToken, refreshToken);
          dispatch(setAuth({ user, isAuthenticated: true }));
          notification.success({
            message: 'SUCCESS',
            description: 'Welcome back to Better Luxury Hotel!'
          });
          // Force a reload to ensure all states are properly initialized and persisted
          window.location.href = '/profile';
        } else {
          notification.error({
            message: 'FAILED',
            description: 'Invalid response from server'
          });
        }
      } else {
        notification.error({
          message: 'FAILED',
          description: response?.result?.message || 'Login failed'
        });
      }
    } catch (error) {
      notification.error({
        message: 'ERROR',
        description: error?.response?.data?.result?.message || error?.response?.data?.result?.error || error?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero title="Account Login" crumb="Login" />

      <section className="py-24 bg-cream/30">
        <div className="mx-auto max-w-[500px] px-6">
          <div className="bg-[#1a1612] p-10 md:p-14 rounded-2xl shadow-2xl border border-white/5">
            <div className="text-center mb-10">
              <div className="eyebrow !text-[#946244]">Returning Guest</div>
              <h2 className="mt-2 font-serif text-4xl text-white">Login</h2>
              <div className="mt-4 h-px w-12 bg-[#946244] mx-auto" />
            </div>

            <Form
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
              >
                <Input
                  prefix={<MailOutlined className="text-[#946244]" />}
                  placeholder="Email Address"
                  className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244] h-14"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-[#946244]" />}
                  placeholder="Password"
                  className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244] h-14"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-white/80 text-xs tracking-widest uppercase">Remember me</Checkbox>
                </Form.Item>
                <Link to="/auth/forgot-password" title="Forgot password" className="text-[#946244] text-xs tracking-widest uppercase font-bold hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-14 bg-[#946244] border-none text-white font-bold tracking-[0.2em] uppercase hover:bg-[#7a5138] transition-all rounded-md"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <span className="text-white/40 text-xs tracking-widest uppercase">Don't have an account? </span>
              <Link to="/auth/registration" className="text-[#946244] text-xs tracking-widest uppercase font-bold hover:text-white transition-colors ml-2">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 2px rgba(148, 98, 68, 0.1) !important;
        }
        .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #946244 !important;
          border-color: #946244 !important;
        }
        .ant-checkbox-wrapper {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </>
  );
}
