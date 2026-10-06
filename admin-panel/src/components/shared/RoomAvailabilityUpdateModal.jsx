import { Button, Modal, Select, App } from 'antd';
import React, { useState } from 'react';
import ApiService from '../../utils/apiService';

function RoomAvailabilityUpdateModal({ statusUpdateModal, setStatusUpdateModal, setFetchAgain }) {
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(statusUpdateModal?.status);

  const roomStatusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
    { value: 'booked', label: 'Booked' }
  ];

  // function to handle update room status
  const handleUpdateStatus = () => {
    if (!status) {
      notification.error({
        message: 'ERROR',
        description: 'Please select a status first to update room status'
      });
    } else {
      setLoading(true);
      ApiService.put(
        `/api/v1/update-room-status/${statusUpdateModal?.roomId}`,
        { room_status: status }
      )
        .then((res) => {
          setLoading(false);
          if (res?.result_code === 0) {
            notification.success({
              message: 'SUCCESS',
              description: res?.result?.message || 'Room status update successful'
            });
            setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }));
            setFetchAgain((prevState) => !prevState);
          } else {
            notification.error({
              message: 'ERROR',
              description: 'Sorry! Something went wrong. App server error'
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          notification.error({
            message: 'ERROR',
            description: err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error'
          });
        });
    }
  };

  return (
    <Modal
      title='Update Room Availability:'
      open={statusUpdateModal?.open}
      onCancel={() => setStatusUpdateModal(
        (prevState) => ({ ...prevState, open: false, status: null })
      )}
      footer={[
        <Button
          onClick={() => setStatusUpdateModal(
            (prevState) => ({ ...prevState, open: false, status: null })
          )}
          key='back'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleUpdateStatus}
          type='primary'
          key='submit'
          disabled={loading}
          loading={loading}
        >
          Update Status
        </Button>
      ]}
    >
      <div className='my-5'>
        <p className='mb-2 text-gray-500'>Current Status: <span className='capitalize font-bold'>{statusUpdateModal?.status}</span></p>
        <Select
          className='w-full'
          placeholder='-- select room status --'
          options={roomStatusOptions}
          size='large'
          value={status}
          onChange={(value) => setStatus(value)}
        />
      </div>
    </Modal>
  );
}

export default RoomAvailabilityUpdateModal;
