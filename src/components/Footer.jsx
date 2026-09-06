import { MapPin, Phone, Mail, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { businessInfo } from '../data/menuData';
import { menuCategories } from '../data/menuData';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`;

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🥟</span>
            <span>Byte <em>Miniz</em></span>
          </div>
          <p className="footer-tagline">{businessInfo.tagline}</p>
          <p className="footer-desc">{businessInfo.description}</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-wa-btn"
            className="footer-wa-btn"
          >
            <MessageCircle size={16} />
            Chat with us
          </a>
        </div>

        {/* Menu */}
        <div className="footer-col">
          <h3>Our Menu</h3>
          <ul>
            {menuCategories.map(cat => (
              <li key={cat.id}>
                <button onClick={() => scrollTo('#menu')}>
                  {cat.emoji} {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            {[
              { label: 'Home',        id: '#home' },
              { label: 'Menu',        id: '#menu' },
              { label: 'Bulk Orders', id: '#bulk-order' },
              { label: 'Reviews',     id: '#reviews' },
              { label: 'Contact Us',  id: '#contact' },
            ].map(link => (
              <li key={link.id}>
                <button onClick={() => scrollTo(link.id)}>{link.label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col footer-contact">
          <h3>Contact</h3>
          <div className="footer-contact-item">
            <MapPin size={14} />
            <a href={businessInfo.googleMapsLink} target="_blank" rel="noopener noreferrer">
              {businessInfo.address} <ExternalLink size={11} />
            </a>
          </div>
          <div className="footer-contact-item">
            <Phone size={14} />
            <a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a>
          </div>
          <div className="footer-contact-item">
            <Mail size={14} />
            <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
          </div>

          <div className="footer-hours">
            <h4>Hours</h4>
            {businessInfo.hours.map(h => (
              <div key={h.day} className="footer-hours-item">
                <span>{h.day}</span>
                <strong>{h.time}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Byte Miniz. All rights reserved.</p>
          <p className="footer-made-with">
            Made with <Heart size={12} fill="currentColor" /> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
