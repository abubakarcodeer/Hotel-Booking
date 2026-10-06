import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tabs, Card } from 'antd';
import React from 'react';
import PrivateRoute from '../components/routes/PrivateRoute';
import MyProfile from '../components/profile/MyProfile';
import BookingHistory from '../components/profile/BookingHistory';
import { PageHero } from "@/components/PageHero.jsx";

export const Route = createFileRoute("/profile")({
  validateSearch: (search) => {
    return {
      tab: search.tab || 'my-profile',
    };
  },
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { tab } = Route.useSearch();

  const handleTabChange = (key) => {
    navigate({
      to: '/profile',
      search: { tab: key },
    });
  };

  return (
    <PrivateRoute>
      <PageHero
        title="Guest Profile"
        crumb="Profile"
        image="/images/jpeg/room-11.jpeg"
      />

      <section className="py-20 bg-cream/30">
        <div className="mx-auto max-w-[1300px] px-6">
          <Card className="shadow-2xl rounded-2xl border-none overflow-hidden">
            <Tabs
              activeKey={tab || 'my-profile'}
              onChange={handleTabChange}
              size="large"
              type="line"
              centered
              className="premium-tabs"
              items={[
                {
                  key: 'my-profile',
                  label: <span className="uppercase tracking-widest text-xs font-bold">My Profile</span>,
                  children: <div className="p-6 md:p-10"><MyProfile /></div>,
                },
                {
                  key: 'booking-history',
                  label: <span className="uppercase tracking-widest text-xs font-bold">Booking History</span>,
                  children: <div className="p-6 md:p-10"><BookingHistory /></div>,
                },
              ]}
            />
          </Card>
        </div>
      </section>

      <style>{`
        .premium-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .premium-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #946244 !important;
        }
        .premium-tabs .ant-tabs-ink-bar {
          background: #946244 !important;
          height: 3px !important;
        }
      `}</style>
    </PrivateRoute>
  );
}
