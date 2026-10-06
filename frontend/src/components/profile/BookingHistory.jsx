import { ExclamationCircleFilled, SortAscendingOutlined, SortDescendingOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import {
  Button, Modal, Rate, Result, Space, Table, Tag, Tooltip, App
} from 'antd';
import { Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import arrayToCommaSeparatedText from '../../utils/arrayToCommaSeparatedText';
import notificationWithIcon from '../../utils/notification';
import { bookingStatusAsResponse } from '../../utils/responseAsStatus';
import ReviewAddModal from '../utilities/ReviewAddModal';

function BookingHistory() {
  const { modal } = App.useApp();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [filter, setFilter] = useState({
    page: 1, limit: 10, sort: 'desc'
  });
  const [addReviewModal, setAddReviewModal] = useState({
    open: false, bookingId: null
  });

  const [loading, error, response] = useFetchData(`/api/v1/get-user-booking-orders?limit=${filter.limit}&page=${filter.page}&sort=${filter.sort}`, fetchAgain);

  const handleCancelBookingOrder = (id) => {
    modal.confirm({
      title: 'Cancel Reservation',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to cancel your room reservation? This action cannot be undone.',
      okText: 'Yes, Cancel',
      cancelText: 'Keep it',
      okButtonProps: { danger: true },
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.put(`/api/v1/cancel-booking-order/${id}`)
            .then((res) => {
              if (res?.result_code === 0) {
                notificationWithIcon('success', 'SUCCESS', 'Your reservation has been cancelled.');
                setFetchAgain(!fetchAgain);
                resolve();
              } else {
                notificationWithIcon('error', 'ERROR', 'Failed to cancel reservation.');
                reject();
              }
            })
            .catch((err) => {
              notificationWithIcon('error', 'ERROR', 'An error occurred.');
              reject();
            });
        });
      }
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockCircleOutlined />;
      case 'approved': return <CheckCircleOutlined />;
      case 'cancel':
      case 'rejected': return <CloseCircleOutlined />;
      default: return <HistoryOutlined />;
    }
  };

  return (
    <div className="booking-history-container">
      {(!loading && !error && response?.data?.rows?.length === 0) || (error && typeof error === 'string' && error.toLowerCase().includes('no bookings')) ? (
        <Result
          title={<span className="font-serif text-3xl">No Reservations Yet</span>}
          subTitle="Your journey with us hasn't started yet. Browse our collection of signature suites to begin your luxury stay."
          status='info'
          extra={(
            <Link to='/rooms'>
              <Button className='btn-gold !bg-[#946244] !text-white px-8 h-12'>
                Explore Rooms
              </Button>
            </Link>
          )}
        />
      ) : error ? (
        <Result title='Failed to fetch history' subTitle={error} status='error' />
      ) : (
        <div className="overflow-x-auto">
          <Table
            dataSource={response?.data?.rows}
            loading={loading}
            rowKey='id'
            pagination={{
              total: response?.data?.total_rows,
              current: filter.page,
              pageSize: filter.limit,
              onChange: (page, pageSize) => setFilter(prev => ({ ...prev, page, limit: pageSize })),
              position: ['bottomCenter'],
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '30', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }}
            columns={[
              {
                title: 'Stay Dates',
                dataIndex: 'booking_dates',
                key: 'booking_dates',
                render: (dates) => (
                  <div className="text-xs font-medium text-black/70">
                    {arrayToCommaSeparatedText(dates?.map(d => d.split('T')[0]))}
                  </div>
                )
              },
              {
                title: 'Signature Suite',
                dataIndex: 'room',
                key: 'room',
                render: (room) => (
                  <Link to={`/rooms/${room?.room_slug}`}>
                    <div className="group cursor-pointer">
                      <div className="text-sm font-serif font-bold group-hover:text-[#946244] transition-colors">
                        {room?.room_name}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest opacity-50">
                        {room?.room_type} Room
                      </div>
                    </div>
                  </Link>
                )
              },
              {
                title: 'Status',
                dataIndex: 'booking_status',
                key: 'status',
                align: 'center',
                render: (status) => (
                  <Tag
                    color={bookingStatusAsResponse(status).color}
                    icon={getStatusIcon(status)}
                    className="border-none px-3 py-0.5 rounded-full uppercase tracking-widest text-[9px] font-bold"
                  >
                    {bookingStatusAsResponse(status).level}
                  </Tag>
                )
              },
              {
                title: 'Feedback',
                dataIndex: 'reviews',
                key: 'reviews',
                align: 'center',
                render: (review) => (
                  <Tooltip title={review?.message}>
                    <div>
                      {review ? <Rate disabled value={review.rating} style={{ fontSize: 12 }} /> : <span className="text-[10px] opacity-30">—</span>}
                    </div>
                  </Tooltip>
                )
              },
              {
                title: 'Actions',
                key: 'actions',
                align: 'right',
                render: (_, record) => (
                  <Space size="middle">
                    {record.booking_status === 'pending' && (
                      <Button
                        danger
                        type="text"
                        size="small"
                        className="text-[10px] uppercase tracking-widest font-bold"
                        onClick={() => handleCancelBookingOrder(record.id)}
                      >
                        Cancel
                      </Button>
                    )}
                    {record.booking_status === 'in-reviews' && (
                      <Button
                        type="primary"
                        size="small"
                        className="bg-[#946244] border-none text-[10px] uppercase tracking-widest font-bold"
                        onClick={() => setAddReviewModal({ open: true, bookingId: record.id })}
                      >
                        Rate Stay
                      </Button>
                    )}
                    {record.booking_status === 'completed' && (
                      <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold italic">
                        Stay Completed
                      </span>
                    )}
                  </Space>
                )
              }
            ]}
          />
        </div>
      )}

      {addReviewModal.open && (
        <ReviewAddModal
          addReviewModal={addReviewModal}
          setAddReviewModal={setAddReviewModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default BookingHistory;
