import React from 'react';
import { DatePicker, Select, Button } from 'antd';
import { motion } from 'framer-motion';

const { Option } = Select;

function BookingBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className='booking-bar-container'
    >
      <div className='booking-bar-inner'>
        <div className='booking-field'>
          <label>CHECK IN</label>
          <DatePicker
            placeholder='April 2024'
            variant='borderless'
            suffixIcon={null}
            className='booking-date-picker'
          />
        </div>

        <div className='booking-divider' />

        <div className='booking-field'>
          <label>CHECK OUT</label>
          <DatePicker
            placeholder='April 2024'
            variant='borderless'
            suffixIcon={null}
            className='booking-date-picker'
          />
        </div>

        <div className='booking-divider' />

        <div className='booking-field'>
          <label>GUEST</label>
          <Select
            defaultValue="1"
            variant='borderless'
            className='booking-select'
            suffixIcon={null}
          >
            <Option value="1">01 Adult / Child</Option>
            <Option value="2">02 Adult / Child</Option>
            <Option value="3">03 Adult / Child</Option>
          </Select>
        </div>

        <button className='booking-check-btn'>
          Check Now
        </button>
      </div>
    </motion.div>
  );
}

export default BookingBar;
