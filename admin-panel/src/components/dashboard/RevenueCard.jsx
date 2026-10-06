import { DollarOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RevenueCard({ loading, data }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-black/5 w-full">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  return (
    <div
      onClick={() => navigate('/main/booking-orders')}
      className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-black/5 cursor-pointer group hover:shadow-md transition-all duration-500 w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <div className="bg-[#f5f0ed] p-5 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <DollarOutlined className="text-3xl text-color-primary" />
        </div>
        <h2 className="font-serif text-[26px] tracking-[0.25em] uppercase text-bg-black">
          Revenue Insights
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-10">
        {/* Total Earned */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-6">
            Total Earned
          </span>
          <div className="text-color-success flex flex-col">
            <span className="text-4xl font-light mb-2">$</span>
            <span className="text-5xl font-bold tracking-tight">
              {formatValue(data?.total_revenue)}
            </span>
          </div>
        </div>

        {/* Pending */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-6">
            Pending
          </span>
          <div className="text-color-warning flex items-baseline gap-3 mt-auto">
            <span className="text-4xl font-light">$</span>
            <span className="text-4xl font-bold tracking-tight">
              {formatValue(data?.pending_revenue)}
            </span>
          </div>
        </div>

        {/* Potential */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-6">
            Potential
          </span>
          <div className="text-color-primary flex flex-col">
            <span className="text-4xl font-light mb-2">$</span>
            <span className="text-5xl font-bold tracking-tight">
              {formatValue(data?.potential_revenue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueCard;
