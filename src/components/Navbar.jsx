import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const navLinks = [
  { href: '#home',       label: 'Home' },
  { href: '#menu',       label: 'Menu' },
  { href: '#bulk-order', label: 'Bulk Orders' },
  { href: '#reviews',    label: 'Reviews' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = getTotalItems();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="logo-icon">🥟</span>
            <span className="logo-text">
              Byte <span>Miniz</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              id="cart-button"
              className="cart-btn"
              aria-label={`Open cart, ${totalItems} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="cart-badge" aria-live="polite">{totalItems}</span>
              )}
            </button>
            <a
              href="#menu"
              className="btn btn-primary navbar-order-btn"
              onClick={(e) => handleNavClick(e, '#menu')}
            >
              Order Now
            </a>
            <button
              id="mobile-menu-btn"
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#menu" className="btn btn-primary mobile-order-btn" onClick={(e) => handleNavClick(e, '#menu')}>
            Order Now
          </a>
        </div>
      </nav>
    </>
  );
}
