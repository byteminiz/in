import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { businessInfo } from '../data/menuData';
import './Contact.css';

export default function Contact() {
  const waLink = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`;

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="text-center contact-header">
          <span className="section-label">Find Us</span>
          <h2 id="contact-heading" className="section-title">
            Visit or <span>Contact Us</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We'd love to hear from you. Pop in, call us, or reach out online — we're always happy to help!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <h3>Our Location</h3>
                  <p>{businessInfo.address}</p>
                  <a
                    href={businessInfo.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="maps-link"
                    className="contact-link"
                  >
                    View on Google Maps <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="contact-divider" />

              <div className="contact-item">
                <div className="contact-icon"><Clock size={20} /></div>
                <div>
                  <h3>Business Hours</h3>
                  <div className="hours-list">
                    {businessInfo.hours.map(h => (
                      <div key={h.day} className="hours-item">
                        <span>{h.day}</span>
                        <strong>{h.time}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-divider" />

              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <h3>Phone</h3>
                  <a href={`tel:${businessInfo.phone}`} id="phone-link" className="contact-link">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="contact-divider" />

              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${businessInfo.email}`} id="email-link" className="contact-link">
                    {businessInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="contact-quick-cta">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                id="wa-contact-btn"
                className="btn btn-primary contact-wa-btn"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a href="#menu" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Order Online
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="contact-map">
            <div className="map-placeholder">
              <div className="map-placeholder-inner">
                <MapPin size={48} />
                <h3>Find Us Here</h3>
                <p>Click to open in Google Maps</p>
                <a
                  href={businessInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="open-maps-btn"
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
