import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Form, Input, Button, Upload, DatePicker, Select, App } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CameraOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { PageHero } from "@/components/PageHero.jsx";
import ApiService from '../../utils/apiService';

export const Route = createFileRoute("/auth/registration")({
  component: RegistrationPage,
});

function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    // Using FormData for file upload
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('password', values.password);
    formData.append('gender', values.gender);
    formData.append('dob', values.dob.format('YYYY-MM-DD'));
    formData.append('address', values.address);

    if (fileList.length > 0) {
      formData.append('avatar', fileList[0].originFileObj);
    }

    try {
      const response = await ApiService.post('/api/v1/auth/registration', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response?.result_code === 0) {
        notification.success({
          message: 'SUCCESS',
          description: 'Account created successfully! Please login.'
        });
        navigate({ to: '/auth/login' });
      } else {
        notification.error({
          message: 'FAILED',
          description: response?.result?.message || 'Registration failed'
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

  const handleUploadChange = async ({ fileList: newFileList }) => {
    let file = newFileList.slice(-1); // Only keep the last uploaded file

    // Generate preview for the selected image
    if (file.length > 0 && !file[0].url && !file[0].preview) {
      file[0].preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    setFileList(file);
  };

  return (
    <>
      <PageHero title="Guest Registration" crumb="Register" />

      <section className="py-24 bg-cream/30">
        <div className="mx-auto max-w-[700px] px-6">
          <div className="bg-[#1a1612] p-10 md:p-14 rounded-2xl shadow-2xl border border-white/5">
            <div className="text-center mb-10">
              <div className="eyebrow !text-[#946244]">Join the Collection</div>
              <h2 className="mt-2 font-serif text-4xl text-white">Create Account</h2>
              <div className="mt-4 h-px w-12 bg-[#946244] mx-auto" />
            </div>

            <Form
              name="register_form"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              scrollToFirstError
            >
              <div className="flex justify-center mb-8">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  className="avatar-uploader"
                >
                  {fileList.length < 1 && (
                    <div className="text-white/50">
                      <CameraOutlined />
                      <div className="mt-2 text-[10px] uppercase tracking-widest">Avatar</div>
                    </div>
                  )}
                </Upload>
              </div>

              <div className="grid md:grid-cols-2 gap-x-6">
                <Form.Item
                  name="fullName"
                  className="md:col-span-2"
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-[#946244]" />}
                    placeholder="Full Name"
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
                >
                  <Input
                    prefix={<MailOutlined className="text-[#946244]" />}
                    placeholder="Email Address"
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-[#946244]" />}
                    placeholder="Phone Number"
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>

                <Form.Item
                  name="dob"
                  rules={[{ required: true, message: 'Please select your date of birth!' }]}
                >
                  <DatePicker
                    placeholder="Date of Birth"
                    className="w-full !bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: 'Please select your gender!' }]}
                >
                  <Select
                    placeholder="Select Gender"
                    className="registration-select"
                    dropdownClassName="registration-dropdown"
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-[#946244]" />}
                    placeholder="Password"
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-[#946244]" />}
                    placeholder="Confirm Password"
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input.TextArea
                  prefix={<HomeOutlined className="text-[#946244]" />}
                  placeholder="Street Address, City, Country"
                  className="!bg-white/5 !border-white/10 !text-white hover:!border-[#946244] focus:!border-[#946244]"
                  rows={3}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-14 bg-[#946244] border-none text-white font-bold tracking-[0.2em] uppercase hover:bg-[#7a5138] transition-all rounded-md mt-4"
                >
                  Complete Registration
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <span className="text-white/40 text-xs tracking-widest uppercase">Already have an account? </span>
              <Link to="/auth/login" className="text-[#946244] text-xs tracking-widest uppercase font-bold hover:text-white transition-colors ml-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ant-picker {
          background-color: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .ant-picker-input > input { color: white !important; }
        .ant-picker-input > input::placeholder { color: rgba(255,255,255,0.3) !important; }
        .ant-picker-suffix { color: #946244 !important; }

        .registration-select .ant-select-selector {
          background-color: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
          color: white !important;
        }
        .ant-select-selection-placeholder {
          color: rgba(255,255,255,0.3) !important;
        }
        .ant-select-arrow { color: #946244 !important; }

        .ant-upload.ant-upload-select-picture-card {
          background-color: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }

        .ant-form-item-label > label { color: rgba(255,255,255,0.5) !important; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; }

        .ant-input::placeholder, .ant-input-password input::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </>
  );
}
