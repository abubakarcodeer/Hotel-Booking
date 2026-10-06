import { createFileRoute } from "@tanstack/react-router";
import { Form, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import contactMap from "@/assets/contact-map.jpg";
import { PageHero } from "@/components/PageHero.jsx";
import notificationWithIcon from '../utils/notification';

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Better Luxury Hotel" },
      { name: "description", content: "Keep in touch with the Better team — send us a message about your stay." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      notificationWithIcon('success', 'MESSAGE SENT', 'Thank you for reaching out! Our concierge will contact you shortly.');
    }, 1500);
  };

  return (
    <>
      <PageHero
        title="Get In Touch"
        crumb="Contact"
        image="/images/jpeg/room-8.jpeg"
      />

      {/* Map Section */}
      <section className="pt-8 pb-16 bg-cream/30">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[440px] group">
            <img src={contactMap} alt="Hotel location map" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1612] p-8 rounded-xl border border-[#946244]/30 shadow-2xl text-center min-w-[300px]">
               <div className="eyebrow !text-[#946244]">Location</div>
               <h3 className="text-white font-serif text-2xl mt-2">Visit Better</h3>
               <p className="text-white/60 text-sm mt-4 leading-relaxed">2972 Westheimer Rd, Santa Ana,<br/>Illinois 85486</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 bg-cream/30">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-2 gap-20">
          <div>
            <div className="eyebrow !text-[#946244]">Inquiry Form</div>
            <h1 className="mt-3 font-serif text-5xl text-[#1a1612]">Drop Us A Line</h1>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed text-justify">
              Whether you have a question about our suites, wish to make a special request,
              or want to share feedback about your recent stay, our team is dedicated to
              providing you with the highest level of service.
            </p>

            <div className="mt-12 space-y-8">
               <ContactInfoItem icon={<PhoneOutlined />} title="Reservations" text="(406) 555-0120" />
               <ContactInfoItem icon={<MailOutlined />} title="Email Concierge" text="concierge@better.com" />
               <ContactInfoItem icon={<EnvironmentOutlined />} title="Our Address" text="2972 Westheimer Rd, Santa Ana" />
            </div>
          </div>

          <div className="bg-[#1a1612] p-10 md:p-14 rounded-2xl shadow-2xl border border-white/5">
            <Form
              name="contact_form"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <div className="grid md:grid-cols-2 gap-x-4">
                <Form.Item name="name" rules={[{ required: true, message: 'Your name is required' }]}>
                  <Input placeholder="Guest Name" className="contact-input" />
                </Form.Item>
                <Form.Item name="phone">
                  <Input placeholder="Phone (Optional)" className="contact-input" />
                </Form.Item>
              </div>

              <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }, { type: 'email' }]}>
                <Input placeholder="Email Address" className="contact-input" />
              </Form.Item>

              <Form.Item name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                <Input.TextArea placeholder="How can we assist you today?" className="contact-input !h-40" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-14 bg-[#946244] border-none text-white font-bold tracking-[0.2em] uppercase hover:bg-[#7a5138] transition-all rounded-md"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>

      <style>{`
        .contact-input {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 4px !important;
        }
        .contact-input:hover, .contact-input:focus {
          border-color: #946244 !important;
          box-shadow: 0 0 0 2px rgba(148, 98, 68, 0.1) !important;
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </>
  );
}

function ContactInfoItem({ icon, title, text }) {
  return (
    <div className="flex gap-4">
       <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-[#946244] shadow-sm border border-gold/10">
         {React.cloneElement(icon, { style: { fontSize: '18px' } })}
       </div>
       <div>
         <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{title}</div>
         <div className="text-[#1a1612] font-serif text-lg mt-1">{text}</div>
       </div>
    </div>
  );
}
