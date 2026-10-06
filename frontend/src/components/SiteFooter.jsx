import { MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Crown } from "./Crown.jsx";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { App } from "antd";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const { notification } = App.useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    notification.success({
      message: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  const openMap = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=2972+Westheimer+Rd,+Santa+Ana,+Illinois+85486", "_blank");
  };

  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 md:grid-cols-4 border-b border-border pb-12">
          {/* Brand */}
          <div>
            <Crown className="h-10 w-10 text-gold" />
            <div className="mt-3 font-serif text-3xl">Better</div>
            <div className="mt-1 text-[10px] tracking-[0.4em] text-muted-foreground">LUXURY HOTEL</div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Poin efficitur, mauris vel condimentum pulvinar, velit orci consectetur ligula.
              Suspendisse et enim.
            </p>
            <div className="mt-6 flex items-center gap-3 text-gold">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity"><Facebook className="h-4 w-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity"><Twitter className="h-4 w-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity"><Instagram className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity"><Linkedin className="h-4 w-4" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="eyebrow">Quick Links</div>
            <div className="mt-2 h-px w-10 bg-gold" />
            <div className="mt-6 flex flex-col gap-y-3 text-sm text-muted-foreground font-medium">
              <Link to="/about" className="hover:text-gold transition-colors">About Our Story</Link>
              <Link to="/rooms" className="hover:text-gold transition-colors">Luxury Rooms</Link>
              <Link to="/news" className="hover:text-gold transition-colors">Latest News</Link>
              <Link to="/contact" className="hover:text-gold transition-colors">Contact Support</Link>
              <Link to="/reservation" className="hover:text-gold transition-colors">Book A Room</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow">Contact</div>
            <div className="mt-2 h-px w-10 bg-gold" />
            <div className="mt-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
              <div>2972 Westheimer Rd. Santa Ana,<br/>Illinois 85486.</div>
              <div>(406) 555-0120</div>
              <div>debbie.baker@example.com</div>
            </div>
            <div className="mt-6 flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <button onClick={openMap} className="btn-gold btn-gold-hover !py-2 !px-4 !text-[10px]">
                Get Hotel Direction
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="eyebrow">Sign Up To Get Latest Update</div>
            <div className="mt-2 h-px w-10 bg-gold" />
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Subscribe to get latest news and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex">
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-border px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <button type="submit" className="bg-gold px-4 text-white hover:opacity-90 transition-opacity" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Better Luxury Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
