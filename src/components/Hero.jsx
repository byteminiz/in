import { ArrowDown, Star } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const scrollToMenu = (e) => {
    e.preventDefault();
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-gradient" />
        <div className="hero-particles" />
      </div>

      <div className="container hero-content">
        {/* Left */}
        <div className="hero-left animate-fade-in-up">
          <div className="hero-badge">
            <Star size={12} fill="currentColor" />
            <span>Loved by 1000+ customers</span>
          </div>

          <h1 className="hero-title">
            Every <span className="gradient-text">Bite</span>,<br />
            A <em>Delight</em>
          </h1>

          <p className="hero-subtitle">
            Handcrafted momos, wok-tossed noodles & soothing beverages that warm your soul.
            Order fresh, enjoy fast — right at your doorstep.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn btn-primary" onClick={scrollToMenu} id="hero-order-btn">
              Order Now 🥟
            </a>
            <a href="#bulk-order" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#bulk-order')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Bulk Orders
            </a>
          </div>

          <div className="hero-stats">
            {[
              { value: '1000+', label: 'Happy Customers' },
              { value: '50+',   label: 'Menu Items' },
              { value: '4.9★',  label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — food cards */}
        <div className="hero-right" aria-hidden="true">
          <div className="food-card-grid">
            <div className="food-card food-card-1 animate-float">
              <img src="/momos.jpg" alt="Steamed momos" loading="eager" />
              <div className="food-card-label">
                <span>🥟</span> Momos
              </div>
            </div>
            <div className="food-card food-card-2 animate-float" style={{ animationDelay: '0.5s' }}>
              <img src="/noodles.jpg" alt="Noodles" loading="eager" />
              <div className="food-card-label">
                <span>🍜</span> Noodles
              </div>
            </div>
            <div className="food-card food-card-3 animate-float" style={{ animationDelay: '1s' }}>
              <img src="/tea_coffee.jpg" alt="Tea and Coffee" loading="eager" />
              <div className="food-card-label">
                <span>☕</span> Beverages
              </div>
            </div>
          </div>

          {/* Floating tags */}
          <div className="hero-tag hero-tag-1">🔥 Spicy Tandoori</div>
          <div className="hero-tag hero-tag-2">✨ Fresh Daily</div>
          <div className="hero-tag hero-tag-3">💚 Veg Options</div>
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#menu" className="scroll-hint" onClick={scrollToMenu} aria-label="Scroll to menu">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
