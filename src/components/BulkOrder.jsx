import { MessageCircle, Mail, Users, ChefHat, Clock, Package } from 'lucide-react';
import { businessInfo } from '../data/menuData';
import './BulkOrder.css';

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Byte Miniz! 🥟\n\nI'm interested in placing a BULK ORDER for an event.\n\nEvent Details:\n- Event Type: \n- Date: \n- Number of People: \n- Items Required: \n\nPlease share your bulk order pricing and availability. Thank you!"
);

const EMAIL_SUBJECT = encodeURIComponent('Bulk Order Enquiry - Byte Miniz');
const EMAIL_BODY = encodeURIComponent(
  "Hello Byte Miniz Team,\n\nI'd like to enquire about bulk orders for an upcoming event.\n\nEvent Details:\n- Event Type: \n- Date: \n- Number of People: \n- Items Required: \n\nPlease share your bulk order menu and pricing.\n\nThank you!"
);

const features = [
  { icon: <Users size={22} />, title: 'Events & Parties', desc: 'From birthday parties to corporate events — we cater them all with fresh, hot food.' },
  { icon: <ChefHat size={22} />, title: 'Custom Menus',   desc: 'Mix and match from our menu. We\'ll work with you to create the perfect spread.' },
  { icon: <Clock size={22} />,  title: 'On-Time Delivery', desc: 'We ensure your food is fresh and delivered right on time, every time.' },
  { icon: <Package size={22} />, title: 'Bulk Discounts',  desc: 'Special pricing for bulk orders. More you order, more you save!' },
];

export default function BulkOrder() {
  const waLink  = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g,'')}?text=${WHATSAPP_MESSAGE}`;
  const mailLink = `mailto:${businessInfo.email}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

  return (
    <section id="bulk-order" className="section bulk-section" aria-labelledby="bulk-heading">
      <div className="container">
        <div className="bulk-inner">
          {/* Left Info */}
          <div className="bulk-left">
            <span className="section-label">For Events & Parties</span>
            <h2 id="bulk-heading" className="section-title">
              Bulk Orders for <span>Every Occasion</span>
            </h2>
            <p className="section-subtitle">
              Planning a birthday, office party, wedding or any celebration? Byte Miniz has you covered with fresh, delicious food in bulk quantities. Get a custom quote today!
            </p>

            <div className="bulk-features">
              {features.map(f => (
                <div key={f.title} className="bulk-feature">
                  <div className="bulk-feature-icon">{f.icon}</div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right CTA Card */}
          <div className="bulk-right">
            <div className="bulk-cta-card">
              <div className="bulk-cta-emoji">🎉</div>
              <h3>Get a Quote</h3>
              <p>
                Reach out via WhatsApp for the fastest response, or drop us an email and we'll get back to you within a few hours.
              </p>

              <div className="bulk-cta-actions">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="whatsapp-bulk-btn"
                  className="bulk-cta-btn bulk-cta-wa"
                  aria-label="Get bulk order quote on WhatsApp"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={mailLink}
                  id="email-bulk-btn"
                  className="bulk-cta-btn bulk-cta-email"
                  aria-label="Get bulk order quote via Email"
                >
                  <Mail size={20} />
                  <span>Send Email</span>
                </a>
              </div>

              <p className="bulk-cta-note">
                📞 Usually responds within 1 hour during business hours
              </p>

              <div className="bulk-stats">
                <div>
                  <strong>50+</strong>
                  <span>Events Catered</span>
                </div>
                <div>
                  <strong>500+</strong>
                  <span>Min. Pieces</span>
                </div>
                <div>
                  <strong>24hrs</strong>
                  <span>Advance Notice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
