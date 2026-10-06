import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, MessageCircle, User, LogOut, Settings } from "lucide-react";
import { Dropdown, Avatar } from "antd";
import { Crown } from "./Crown.jsx";
import { removeSessionAndLogoutUser } from "../utils/authentication";
import { logout } from "../store/slices/appSlice";
import getImageUrl from "../utils/imageUrl";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInitials = user?.fullName
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')
    ?.toUpperCase() || 'U';

  const handleLogout = () => {
    dispatch(logout());
    removeSessionAndLogoutUser();
    // Force a reload to ensure all states are cleared and avoid rehydration issues
    window.location.href = '/auth/login';
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/profile">My Profile</Link>,
      icon: <User size={14} />,
    },
    {
      key: 'bookings',
      label: <Link to="/profile" search={{ tab: 'booking-history' }}>My Bookings</Link>,
      icon: <Settings size={14} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogOut size={14} />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  const nav = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms & Suites" },
    { to: "/news", label: "News" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-[#1a1612] text-white">
      {/* Top strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 text-[11px] tracking-[0.2em] uppercase">
          {/* Left: Address */}
          <div className="hidden md:block w-1/3">
            <div className="text-white/50 font-medium">Visit Us Daily :</div>
            <div className="mt-2 normal-case tracking-normal text-[#946244] font-medium">
              2972 Westheimer Rd, Santa Ana, Illinois 85486
            </div>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex items-center gap-4 flex-1 justify-center group">
            <Crown className="h-10 w-10 text-[#946244] group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <div className="font-serif text-4xl leading-none text-white tracking-tight">Better</div>
              <div className="text-[9px] tracking-[0.4em] text-white/40 mt-1 uppercase">Luxury Hotel</div>
            </div>
          </Link>

          {/* Right: Contact */}
          <div className="hidden md:flex items-center gap-4 w-1/3 justify-end text-right">
            <div className="p-2.5 rounded-full bg-white/5">
              <MessageCircle className="h-5 w-5 text-[#946244]" />
            </div>
            <div>
              <div className="text-white/50 font-medium">Chat Us Anytime</div>
              <div className="mt-1 normal-case tracking-normal text-[#946244] font-serif text-lg leading-none">(406) 555-0120</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          {/* Menu Button (Mobile Only) */}
          <div className="flex-1 md:hidden ">
            <button
              className="text-[#946244] hover:text-white transition-colors"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center gap-14 text-[11px] tracking-[0.4em] uppercase font-bold absolute left-1/2 -translate-x-1/2">
            {nav.map(n => (
              <Link
                key={n.label}
                to={n.to}
                className="text-white/70 hover:text-[#946244] transition-colors"
                activeProps={{ className: "!text-[#946244]" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right: Auth & Lang */}
          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase font-bold text-white/50">
            <span className="text-[#946244] hidden sm:block cursor-pointer hover:opacity-80 transition-opacity">EN</span>
            <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleMenuClick }}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center gap-3 cursor-pointer group">
                  <Avatar
                    src={getImageUrl(user?.avatar)}
                    size={40}
                    className="border border-[#946244]/30 bg-[#946244] text-white font-bold"
                  >
                    {userInitials}
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <div className="text-white group-hover:text-[#946244] transition-colors lowercase tracking-normal">{user?.fullName || user?.userName}</div>
                    <div className="text-[8px] text-white/30 uppercase tracking-widest">{user?.role}</div>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/login" className="hover:text-[#946244] transition-colors">Login</Link>
                <span className="text-white/10">/</span>
                <Link to="/auth/registration" className="hover:text-[#946244] transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile / Full Menu Overlay */}
        {open && (
          <div className="md:hidden border-t border-white/5 bg-[#1a1612] px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
            {nav.map(n => (
              <Link
                key={n.label}
                to={n.to}
                className="block text-xs tracking-[0.3em] uppercase text-white/70 hover:text-[#946244]"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
