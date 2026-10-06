import { SearchOutlined } from '@ant-design/icons';
import { Input, Card } from 'antd';
import React from 'react';

function QueryOptions({ query, setQuery, disabledSearch }) {
  return (
    <Card className='mb-6 rounded-xl border-none shadow-sm bg-white/50 backdrop-blur-sm'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
        <Input
          className='flex-grow !bg-white !border-gray-100 !rounded-lg hover:!border-color-primary focus:!border-color-primary h-12'
          onChange={(e) => setQuery((prevState) => ({ ...prevState, search: e.target.value }))}
          placeholder='Search for records...'
          prefix={<SearchOutlined className='text-gray-400 mr-2' />}
          disabled={disabledSearch}
          value={query.search}
          size='large'
          allowClear
        />
      </div>
    </Card>
  );
}

export default React.memo(QueryOptions);
