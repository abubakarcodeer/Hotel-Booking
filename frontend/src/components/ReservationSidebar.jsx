import { Link } from "@tanstack/react-router";
import React, { useState } from 'react';
import { DatePicker, Select, Slider, Divider } from 'antd';
import { Calendar, DollarSign } from "lucide-react";

const { RangePicker } = DatePicker;
const { Option } = Select;

export function ReservationSidebar({
  title = "Your Reservation",
  showEmail = false,
  showPrice = false,
  showPriceFilter = false,
  roomPrice = 0,
  ctaLabel = "Book Now",
  disabled = false,
  onCTA
}) {
  const [formData, setFormData] = useState({
    email: '',
    dates: null,
    adults: 1,
    children: 0,
    priceRange: [0, 2000]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (onCTA) {
      onCTA(formData);
    }
  };

  return (
    <aside className="bg-cream p-8 rounded-2xl shadow-sm border border-[#946244]/10">
      <div className="text-center">
        <div className="eyebrow">Booking Form</div>
        <h3 className="mt-2 font-serif text-3xl">{title}</h3>
      </div>

      <form className="mt-8 space-y-5 text-sm" onSubmit={handleSubmit}>
        {showEmail && (
          <Field label="Email :">
            <input
              type="email"
              placeholder="Your email address"
              className="hx-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={disabled}
            />
          </Field>
        )}
        <div className="space-y-4">
          <Field label="Check In & Out :">
            <div className={`hx-input flex items-center focus-within:ring-1 focus-within:ring-[#946244]/30 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <RangePicker
                className="w-full !p-0"
                suffixIcon={<Calendar className="h-4 w-4 text-[#946244]" />}
                format="DD . MMM YYYY"
                value={formData.dates}
                onChange={(dates) => setFormData({ ...formData, dates })}
                placeholder={['Check In', 'Check Out']}
                variant="borderless"
                disabled={disabled}
                allowEmpty={[true, true]}
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Adults :">
              <div className={`hx-input-select focus-within:ring-1 focus-within:ring-[#946244]/30 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Select
                  className="w-full h-full"
                  value={formData.adults}
                  onChange={(val) => setFormData({ ...formData, adults: val })}
                  variant="borderless"
                  disabled={disabled}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <Option key={num} value={num}>{num}</Option>
                  ))}
                </Select>
              </div>
            </Field>
            <Field label="Children :">
              <div className={`hx-input-select focus-within:ring-1 focus-within:ring-[#946244]/30 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Select
                  className="w-full h-full"
                  value={formData.children}
                  onChange={(val) => setFormData({ ...formData, children: val })}
                  variant="borderless"
                  disabled={disabled}
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <Option key={num} value={num}>{num}</Option>
                  ))}
                </Select>
              </div>
            </Field>
          </div>

          {showPriceFilter && (
            <Field label="Price Range :">
              <div className="px-2 pt-2">
                <Slider
                  range
                  min={0}
                  max={2000}
                  step={50}
                  defaultValue={[0, 2000]}
                  styles={{
                    track: { background: '#946244' },
                    handle: { borderColor: '#946244', background: '#fff' }
                  }}
                  onChange={(val) => setFormData({ ...formData, priceRange: val })}
                  disabled={disabled}
                />
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#946244] font-bold mt-1">
                  <span>${formData.priceRange[0]}</span>
                  <span>${formData.priceRange[1]}</span>
                </div>
              </div>
            </Field>
          )}
        </div>

        {showPrice && (
          <div className="border-t border-border pt-6 mt-6">
            <div className="flex justify-between items-end">
               <div>
                 <div className="eyebrow !text-foreground/60">Base Price</div>
                 <div className="mt-1 font-serif text-2xl text-[#946244]">${roomPrice}</div>
               </div>
               <div className="text-[10px] uppercase tracking-widest text-muted-foreground pb-1">/ Per Night</div>
            </div>

            <div className="mt-4 p-3 bg-white/50 rounded-lg border border-[#946244]/10 flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
              <div className="text-[#946244] mt-0.5 font-bold">!</div>
              <div>Final price calculated based on selected dates.</div>
            </div>
          </div>
        )}

        {onCTA ? (
          <button
            type="submit"
            disabled={disabled}
            className={`btn-gold btn-gold-hover w-full py-4 text-sm font-bold shadow-lg shadow-gold/20 !bg-[#946244] !text-white hover:!bg-[#7a5138] transition-all ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            {ctaLabel}
          </button>
        ) : (
          <Link
            to="/rooms"
            className="btn-gold btn-gold-hover w-full py-4 text-sm font-bold shadow-lg shadow-gold/20 text-center block !bg-[#946244] !text-white hover:!bg-[#7a5138] transition-all"
          >
            {ctaLabel || "Find a Room"}
          </Link>
        )}

        <div className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-4">
          No credit card required today
        </div>
      </form>
    </aside>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow !text-foreground/80">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
