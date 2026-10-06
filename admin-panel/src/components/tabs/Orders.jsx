import {
  Button, Empty, Pagination, Rate, Result, Skeleton, Tag, Tooltip, Modal, App
} from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import arrayToCommaSeparatedText from '../../utils/arrayToCommaSeparatedText';
import notificationWithIcon from '../../utils/notification';
import { bookingStatusAsResponse } from '../../utils/responseAsStatus';
import QueryOptions from '../shared/QueryOptions';
import RoomStatusUpdateModal from '../shared/RoomStatusUpdateModal';
import UserViewModal from '../shared/UserViewModal';

const { confirm } = Modal;

function Orders() {
  const { modal } = App.useApp();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [query, setQuery] = useState({
    search: '', sort: 'desc', page: '1', rows: '10'
  });
  const [statusUpdateModal, setStatusUpdateModal] = useState(
    { open: false, roomId: null, status: null }
  );
  const [userViewModal, setUserViewModal] = useState(
    { open: false, user: null }
  );

  // fetch booking-list API data
  const [loading, error, response] = useFetchData(`/api/v1/get-all-booking-orders?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete booking
  const handleDeleteBooking = (id) => {
    modal.confirm({
      title: 'DELETE RESERVATION',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to delete this reservation permanently? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Keep it',
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/api/v1/delete-booking-order/${id}`)
            .then((res) => {
              if (res?.result_code === 0) {
                notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'Reservation deleted successfully');
                setFetchAgain(!fetchAgain);
                resolve();
              } else {
                notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
                reject();
              }
            })
            .catch((err) => {
              notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
              reject();
            });
        }).catch(() => notificationWithIcon('error', 'ERROR', 'Oops errors!'));
      }
    });
  };

  return (
    <div>
      {/* booking list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} disabledSearch />

      {/* room list ― content section */}
      <div className='w-full flex flex-row flex-wrap items-center justify-center gap-2'>
        {error ? (
          <Result
            title='Failed to fetch'
            subTitle={error}
            status='error'
          />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.data?.rows?.length === 0 ? (
              <Empty
                className='mt-10'
                description={(<span>Sorry! Any data was not found.</span>)}
              />
            ) : (
              <div className='table-layout'>
                <div className='table-layout-container'>
                  <table className='data-table'>
                    {/* data table ― head */}
                    <thead className='data-table-head'>
                      <tr className='data-table-head-tr'>
                        <th className='data-table-head-tr-th' scope='col'>
                          Booking Dates
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Booking Status
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Booked By
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Booked Room
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Revenue
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Review & Ratting
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Booking Actions
                        </th>
                      </tr>
                    </thead>

                    {/* data table ― body */}
                    <tbody>
                      {response?.data?.rows?.map((data) => (
                        <tr className='data-table-body-tr' key={uniqueId()}>
                          <td className='data-table-body-tr-td'>
                            {arrayToCommaSeparatedText(data?.booking_dates?.map(
                              (date) => (date.split('T')[0])
                            ))}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag
                              className='w-[100px] text-center uppercase'
                              color={bookingStatusAsResponse(data?.booking_status).color}
                            >
                              {bookingStatusAsResponse(data?.booking_status).level}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td'>
                            <Button
                              type="link"
                              className="!p-0 h-auto text-inherit hover:!text-color-primary flex items-center gap-2"
                              onClick={() => setUserViewModal({ open: true, user: data?.booking_by })}
                            >
                              <UserOutlined className="text-color-primary" />
                              {data?.booking_by?.fullName}
                            </Button>
                          </td>
                          <td className='data-table-body-tr-td'>
                            {data?.room?.room_name}
                          </td>
                          <td className={`data-table-body-tr-td text-center font-semibold ${data?.booking_status === 'cancel' || data?.booking_status === 'rejected' ? 'text-gray-400 line-through' : 'text-green-600'}`}>
                            {`$ ${((data?.booking_status === 'cancel' || data?.booking_status === 'rejected' ? 0 : (data?.booking_dates?.length || 0)) * (Number(data?.room?.room_price) || 0)).toFixed(2)}`}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            {data?.reviews ? (
                              <Tooltip
                                title={data?.reviews?.message}
                                placement='top'
                                trigger='hover'
                              >
                                <Rate value={data?.reviews?.rating} disabled />
                              </Tooltip>
                            ) : 'N/A'}
                          </td>
                          <td className='data-table-body-tr-td !px-0 text-center'>
                            <div className='flex items-center justify-center gap-2'>
                              {data?.booking_status !== 'cancel' &&
                              data?.booking_status !== 'rejected' &&
                              data?.booking_status !== 'in-reviews' &&
                              data?.booking_status !== 'completed' && (
                                <Tooltip title="Update Booking Status">
                                  <Button
                                    className='inline-flex items-center !px-2'
                                    type='primary'
                                    icon={<EditOutlined />}
                                    onClick={() => setStatusUpdateModal((prevState) => ({
                                      ...prevState, open: true, roomId: data?.id, status: data?.booking_status
                                    }))}
                                  />
                                </Tooltip>
                              )}

                              <Tooltip title="Delete Reservation">
                                <Button
                                  className='inline-flex items-center !px-2'
                                  type='primary'
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleDeleteBooking(data?.id)}
                                />
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Skeleton>
        )}
      </div>

      {/* booking list ― pagination */}
      {response?.data?.total_page > 0 && (
        <div className='flex justify-center mt-5'>
          <Pagination
            onChange={(page, pageSize) => setQuery((prevState) => ({
              ...prevState,
              page: page.toString(),
              rows: pageSize.toString()
            }))}
            total={response?.data?.total_rows || 0}
            current={parseInt(query.page)}
            pageSize={parseInt(query.rows)}
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '30', '50']}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </div>
      )}

      {/* room status update modal component */}
      {statusUpdateModal?.open && (
        <RoomStatusUpdateModal
          statusUpdateModal={statusUpdateModal}
          setStatusUpdateModal={setStatusUpdateModal}
          setFetchAgain={setFetchAgain}
        />
      )}

      {/* user view modal component */}
      {userViewModal?.open && (
        <UserViewModal
          userViewModal={userViewModal}
          setUserViewModal={setUserViewModal}
        />
      )}
    </div>
  );
}

export default Orders;
