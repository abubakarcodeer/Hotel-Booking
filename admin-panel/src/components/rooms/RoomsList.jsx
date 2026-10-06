import { ExclamationCircleFilled, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Empty, Modal, Pagination, Result, Skeleton, Tag, Tooltip, App
} from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { roomStatusAsResponse, roomTypeAsColor } from '../../utils/responseAsStatus';
import getImageUrl from '../../utils/imageUrl';
import QueryOptions from '../shared/QueryOptions';
import RoomEdit from './RoomEdit';
import RoomAvailabilityUpdateModal from '../shared/RoomAvailabilityUpdateModal';

const { confirm } = Modal;

function RoomsList({ add }) {
  const { modal } = App.useApp();
  const [query, setQuery] = useState({
    search: '', sort: 'asce', page: '1', rows: '10'
  });
  const [roomEditModal, setRoomEditModal] = useState(
    { open: false, roomId: null }
  );
  const [statusUpdateModal, setStatusUpdateModal] = useState(
    { open: false, roomId: null, status: null }
  );
  const [fetchAgain, setFetchAgain] = useState(false);

  // fetch room-list API data
  const [loading, error, response] = useFetchData(`/api/v1/all-rooms-list?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete
  const handleDeleteRoom = (id) => {
    modal.confirm({
      title: 'DELETE ROOM',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this Room permanently?',
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/api/v1/delete-room/${id}`)
            .then((res) => {
              if (res?.result_code === 0) {
                notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'Room delete successful');
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
      {/* room list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

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
                          Images
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Room Name
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Room Type
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Room Price
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Room Size
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Room Status
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Room Actions
                        </th>
                      </tr>
                    </thead>

                    {/* data table ― body */}
                    <tbody>
                      {response?.data?.rows?.map((data) => (
                        <tr className='data-table-body-tr' key={uniqueId()}>
                          <td className='data-table-body-tr-td'>
                            <Avatar.Group>
                              {data?.room_images?.map((image) => (
                                <Avatar
                                  key={uniqueId()}
                                  src={getImageUrl(image.url)}
                                  crossOrigin='anonymous'
                                  size='large'
                                />
                              ))}
                            </Avatar.Group>
                          </td>
                          <td className='data-table-body-tr-td'>
                            {data?.room_name}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag
                              className='text-center uppercase'
                              color={roomTypeAsColor(data?.room_type)}
                            >
                              {data?.room_type}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td !lowercase'>
                            {`$ ${data?.room_price}`}
                          </td>
                          <td className='data-table-body-tr-td'>
                            {`${data?.room_size} sq. ft.`}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tooltip title="Click to Change Status">
                              <Tag
                                className='w-[80px] text-center uppercase cursor-pointer hover:opacity-80 transition-all'
                                color={roomStatusAsResponse(data?.room_status).color}
                                onClick={() => setStatusUpdateModal({
                                  open: true,
                                  roomId: data?.id,
                                  status: data?.room_status
                                })}
                              >
                                {roomStatusAsResponse(data?.room_status).level}
                              </Tag>
                            </Tooltip>
                          </td>
                          <td className='data-table-body-tr-td !px-0 text-center text-lg'>
                            <Tooltip title="View Room">
                              <Button
                                className='inline-flex items-center !px-2'
                                onClick={() => add(data?.id)}
                                type='link'
                                icon={<EyeOutlined />}
                              />
                            </Tooltip>
                            <Tooltip title="Edit Room">
                              <Button
                                className='inline-flex items-center !px-2'
                                onClick={() => setRoomEditModal(
                                  (prevState) => ({ ...prevState, open: true, roomId: data?.id })
                                )}
                                type='link'
                                icon={<EditOutlined />}
                              />
                            </Tooltip>
                            <Tooltip title="Delete Room">
                              <Button
                                className='inline-flex items-center !px-2'
                                onClick={() => handleDeleteRoom(data?.id)}
                                type='link'
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Tooltip>
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

      {/* room list ― pagination */}
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

      {/* room edit modal component */}
      {roomEditModal.open && (
        <RoomEdit
          roomEditModal={roomEditModal}
          setRoomEditModal={setRoomEditModal}
        />
      )}

      {/* room availability update modal component */}
      {statusUpdateModal.open && (
        <RoomAvailabilityUpdateModal
          statusUpdateModal={statusUpdateModal}
          setStatusUpdateModal={setStatusUpdateModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default React.memo(RoomsList);
