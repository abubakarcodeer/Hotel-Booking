import { ExclamationCircleFilled, UserOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Empty, Modal, Pagination, Result, Skeleton, Tag, Tooltip, App
} from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import { getSessionUser } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import { userStatusAsResponse } from '../../utils/responseAsStatus';
import getImageUrl from '../../utils/imageUrl';
import QueryOptions from '../shared/QueryOptions';

const { confirm } = Modal;

function UsersList({ add }) {
  const { modal } = App.useApp();
  const user = getSessionUser();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [query, setQuery] = useState({
    search: '', sort: 'asce', page: '1', rows: '10'
  });

  // fetch user-list API data
  const [loading, error, response] = useFetchData(`/api/v1/all-users-list?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete user
  const handleDeleteUser = (id) => {
    modal.confirm({
      title: 'DELETE USER',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this User permanently?',
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/api/v1/delete-user/${id}`)
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
      {/* user list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* user list ― content section */}
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
                          Avatar
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Full Name
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Email
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Phone
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Role
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          User Actions
                        </th>
                      </tr>
                    </thead>

                    {/* data table ― body */}
                    <tbody>
                      {response?.data?.rows?.map((data) => (
                        <tr className='data-table-body-tr' key={uniqueId()}>
                          <td className='data-table-body-tr-td text-center'>
                            <Avatar
                              src={getImageUrl(data?.avatar)}
                              crossOrigin='anonymous'
                              icon={<UserOutlined />}
                            />
                          </td>
                          <td className='data-table-body-tr-td'>
                            {data?.fullName}
                          </td>
                          <td className='data-table-body-tr-td !lowercase'>
                            {data?.email}
                          </td>
                          <td className='data-table-body-tr-td'>
                            {data?.phone}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag
                              className='w-[60px] text-center uppercase'
                              color={data?.role === 'admin' ? 'magenta' : 'purple'}
                            >
                              {data?.role}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td !px-0 text-center'>
                            <Tooltip title="View User">
                              <Button
                                className='inline-flex items-center !px-2'
                                onClick={() => add(data?.id)}
                                type='link'
                                icon={<EyeOutlined />}
                              />
                            </Tooltip>

                            {user?.id !== data?.id && (
                              <Tooltip title="Delete User">
                                <Button
                                  className='inline-flex items-center !px-2'
                                  onClick={() => handleDeleteUser(data?.id)}
                                  type='link'
                                  danger
                                  icon={<DeleteOutlined />}
                                />
                              </Tooltip>
                            )}
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

      {/* user list ― pagination */}
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
    </div>
  );
}

export default React.memo(UsersList);
