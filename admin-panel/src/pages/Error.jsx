import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  window.document.title = 'Better — Error';

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[#fdfbf7]'>
      <Result
        className='font-serif font-medium'
        status='404'
        title='404 - Error Page!'
        subTitle='Sorry, the page you visited does not exist.'
        extra={(
          <Link to='/'>
            <Button
              type='primary'
              shape='round'
              size='large'
            >
              Back to Home
            </Button>
          </Link>
        )}
      />
    </div>
  );
}

export default NotFound;
