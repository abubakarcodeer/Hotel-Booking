
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, App, Divider } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from '@tanstack/react-router';
import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { Calendar } from 'react-multi-date-picker';
import _DatePanel from 'react-multi-date-picker/plugins/date_panel';
import _DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header';
import _Toolbar from 'react-multi-date-picker/plugins/toolbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2, X } from 'lucide-react';
import ApiService from '../../utils/apiService';

const DatePanel = _DatePanel.default || _DatePanel;
const DatePickerHeader = _DatePickerHeader.default || _DatePickerHeader;
const Toolbar = _Toolbar.default || _Toolbar;

function OrderPlaceModal({ bookingModal, setBookingModal }) {
  const { modal, message, notification } = App.useApp();
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Stable date limits to prevent calendar re-render navigation freeze
  const minDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 90); // Extended to 90 days for better guest planning
    return date;
  }, []);

  // handle date change on date picker
  const handleDateChange = (dates) => {
    setSelectedDates(dates || []);
  };

  // function to handle placed room booking order
  const handlePlacedOrder = () => {
    if (selectedDates.length === 0) {
      notification.error({
        message: 'SELECTION REQUIRED',
        description: 'Please select at least one date to proceed with your booking.'
      });
      return;
    }
    if (selectedDates.length > 5) {
      notification.warning({
        message: 'DURATION LIMIT',
        description: 'Maximum stay for online booking is 5 nights. Please contact concierge for longer stays.'
      });
      return;
    }

    const formattedDates = selectedDates.map((date) => dayjs(date.toDate ? date.toDate() : date).format('YYYY-MM-DD'));

    modal.confirm({
      title: <span className="font-serif text-2xl">Confirm Your Stay</span>,
      icon: <CalendarIcon className="text-[#946244] mr-2" size={24} />,
      content: (
        <div className="mt-4 space-y-4">
          <div className="bg-cream p-4 rounded-lg border border-[#946244]/10">
            <div className="text-[10px] uppercase tracking-widest text-[#946244] font-bold mb-2">Selected Dates</div>
            <div className="text-sm font-medium text-black/70 flex flex-wrap gap-2">
              {formattedDates.map(d => (
                <span key={d} className="bg-white px-2 py-1 rounded border border-[#946244]/5">{d}</span>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            By confirming, you agree to our terms and conditions. Our concierge will review your request shortly.
          </p>
        </div>
      ),
      okText: 'Confirm Reservation',
      cancelText: 'Review Dates',
      okButtonProps: { className: 'btn-gold !h-10 !px-6' },
      cancelButtonProps: { type: 'text', className: 'uppercase tracking-widest text-[10px] font-bold' },
      centered: true,
      width: 450,
      onOk() {
        return new Promise((resolve, reject) => {
          setLoading(true);
          ApiService.post(`/api/v1/placed-booking-order/${bookingModal?.roomId}`, {
            booking_dates: formattedDates
          })
            .then((res) => {
              setLoading(false);
              resolve();
              if (res?.result_code === 0) {
                notification.success({
                  message: 'RESERVATION PLACED',
                  description: 'Your request has been received. We will notify you once confirmed.'
                });
                setBookingModal((prevState) => ({ ...prevState, open: false, roomId: null }));
                navigate({ to: '/profile', search: { tab: 'booking-history' } });
                setSelectedDates([]);
              } else {
                notification.error({
                  message: 'ERROR',
                  description: 'Something went wrong while processing your request.'
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              notification.error({
                message: 'ERROR',
                description: (err?.response?.data?.result?.error?.message || err?.message || 'Server error occurred.')
              });
              reject();
            });
        }).catch((err) => message.error(err?.message || 'Oops errors!'));
      }
    });
  };

  // close modal and reset
  const handleClose = () => {
    setBookingModal((prevState) => (
      { ...prevState, open: false, roomId: null }
    ));
    setSelectedDates([]);
  };

  return (
    <Modal
      open={bookingModal.open}
      onCancel={handleClose}
      closable={false}
      centered
      width={700}
      footer={null}
      className="premium-booking-modal"
    >
      <div className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white min-h-[500px]">
        {/* Left: Visual Sidebar */}
        <div className="md:w-1/3 bg-[#1a1612] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="eyebrow !text-[#946244]">Reservation</div>
            <h2 className="mt-4 font-serif text-4xl leading-tight">Secure Your<br/>Stay</h2>
            <p className="mt-6 text-xs text-white/50 leading-relaxed tracking-wide uppercase">
              Select your preferred dates to begin your luxury experience at Better.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-3 text-xs tracking-widest text-[#946244] font-bold">
               <CheckCircle2 size={16} /> NO BOOKING FEES
             </div>
             <div className="flex items-center gap-3 text-xs tracking-widest text-[#946244] font-bold">
               <CheckCircle2 size={16} /> INSTANT REQUEST
             </div>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#946244]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        {/* Right: Interaction Area */}
        <div className="md:w-2/3 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#946244] font-bold">Step 1: Date Selection</div>
            <button onClick={handleClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X size={20} className="text-black/40" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="w-full premium-calendar-wrapper">
              <Calendar
                style={{
                  width: '100%',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent'
                }}
                plugins={[
                  <DatePickerHeader
                    key='date-picker-header'
                    position='top'
                    size='medium'
                    style={{ backgroundColor: "#946244" }}
                  />,
                  <DatePanel
                    style={{ width: '100%', borderLeft: '1px solid #f0f0f0' }}
                    key='date-panel'
                    position='right'
                    sort='date'
                  />,
                  <Toolbar
                    key='toolbar'
                    position='bottom'
                  />
                ]}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleDateChange}
                value={selectedDates}
                format='YYYY/MM/DD'
                multiple
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Stay Duration</span>
              <span className="font-serif text-lg">{selectedDates.length} {selectedDates.length === 1 ? 'Night' : 'Nights'}</span>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleClose} type="text" className="uppercase tracking-widest text-[10px] font-bold h-12 px-6">
                Cancel
              </Button>
              <Button
                onClick={handlePlacedOrder}
                className="btn-gold !h-12 !px-10 shadow-lg shadow-[#946244]/20"
                loading={loading}
                disabled={loading}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .premium-booking-modal .ant-modal-content {
          padding: 0 !important;
          border-radius: 16px !important;
          overflow: hidden;
        }
        .premium-calendar-wrapper .rmdp-calendar {
          background-color: transparent !important;
        }
        .premium-calendar-wrapper .rmdp-day.rmdp-selected span:not(.highlight) {
          background-color: #946244 !important;
          box-shadow: 0 4px 10px rgba(148, 98, 68, 0.3) !important;
        }
        .premium-calendar-wrapper .rmdp-day.rmdp-today span {
          background-color: rgba(148, 98, 68, 0.1) !important;
          color: #946244 !important;
        }
        .premium-calendar-wrapper .rmdp-arrow {
          border: solid #946244 !important;
          border-width: 0 2px 2px 0 !important;
        }
        .premium-calendar-wrapper .rmdp-header-values {
          color: #946244 !important;
          font-family: "Cormorant Garamond", serif !important;
          font-size: 1.2rem !important;
          font-weight: 600 !important;
        }
        /* UNIVERSAL BLUE REMOVAL - Brute force approach */
        .premium-calendar-wrapper .rmdp-header,
        .premium-calendar-wrapper .rmdp-top-class,
        .premium-calendar-wrapper .rmdp-bg-blue,
        .premium-calendar-wrapper .rmdp-panel-date,
        .premium-calendar-wrapper .rmdp-button,
        .premium-calendar-wrapper [style*="background-color: rgb(0, 116, 217)"],
        .premium-calendar-wrapper [style*="background-color: #0074d9"],
        .premium-calendar-wrapper [style*="background-color:#0074d9"],
        .premium-calendar-wrapper .rmdp-day.rmdp-selected span:not(.highlight),
        .premium-calendar-wrapper .rmdp-day.rmdp-range span {
          background-color: #946244 !important;
          background: #946244 !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
        }
        .premium-calendar-wrapper .rmdp-button:hover,
        .premium-calendar-wrapper .rmdp-panel-date:hover {
          background-color: #7a5138 !important;
          background: #7a5138 !important;
          color: #ffffff !important;
        }
        .premium-calendar-wrapper .rmdp-panel-body li .rmdp-panel-date {
           background-color: #946244 !important;
           color: #ffffff !important;
           border: none !important;
        }
        /* Target the 'x' button inside date tags */
        .premium-calendar-wrapper .rmdp-panel-date .rmdp-close {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        /* Fix for the blue circle/border in the header navigation */
        .premium-calendar-wrapper .rmdp-arrow-container:hover {
          background-color: rgba(148, 98, 68, 0.1) !important;
          border: 1px solid #946244 !important;
        }
        /* Fix for text contrast inside the calendar body */
        .premium-calendar-wrapper .rmdp-day span {
          color: #4a4a4a;
        }
        .premium-calendar-wrapper .rmdp-day.rmdp-selected span:not(.highlight) {
          color: #ffffff !important;
        }
        .premium-calendar-wrapper .rmdp-week-day {
          color: #946244 !important;
          font-weight: bold !important;
        }
        /* Fix for the background of the calendar area itself to prevent it being all brown */
        .premium-calendar-wrapper .rmdp-calendar {
          background-color: #ffffff !important;
        }
        .premium-calendar-wrapper .rmdp-panel {
          background-color: #fdfbf7 !important;
        }
          color: #946244 !important;
          font-weight: bold !important;
        }
        .premium-calendar-wrapper .rmdp-panel-header {
          color: #946244 !important;
          font-weight: bold !important;
        }
        .premium-calendar-wrapper .rmdp-panel-header {
          background-color: #fdfbf7 !important;
          color: #946244 !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          font-size: 10px !important;
          letter-spacing: 0.1em !important;
        }
      `}</style>
    </Modal>
  );
}

OrderPlaceModal.defaultProps = {
  bookingModal: { open: false, roomId: null }
};

OrderPlaceModal.propTypes = {
  bookingModal: PropTypes.object
};

export default OrderPlaceModal;
