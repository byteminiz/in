import { MessageCircle } from 'lucide-react';
import { businessInfo } from '../data/menuData';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const msg = encodeURIComponent("Hello Byte Miniz! 🥟 I'd like to place an order. Could you help me?");
  const waLink = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=${msg}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp-btn"
      className="floating-wa-btn"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
      <span className="floating-wa-label">Chat with us</span>
    </a>
  );
}
