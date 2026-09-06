import { useState } from 'react';
import { Plus, Minus, Leaf, Flame, Sparkles, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuCategories } from '../data/menuData';
import './Menu.css';

function MenuItemCard({ item }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const qty = getItemQuantity(item.id);

  return (
    <article className="menu-item-card">
      <div className="menu-item-top">
        <div className="menu-item-badges">
          <span className={`badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
            {item.isVeg ? <Leaf size={9} /> : <Flame size={9} />}
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          {item.isPopular && <span className="badge badge-popular"><TrendingUp size={9} />Popular</span>}
          {item.isNew && <span className="badge badge-new"><Sparkles size={9} />New</span>}
        </div>
        <span className="menu-item-price">₹{item.price}</span>
      </div>

      <div className="menu-item-info">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-desc">{item.description}</p>
      </div>

      <div className="menu-item-action">
        {qty === 0 ? (
          <button
            id={`add-${item.id}`}
            className="btn btn-primary add-btn"
            onClick={() => addToCart(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus size={16} /> Add
          </button>
        ) : (
          <div className="qty-control" role="group" aria-label={`${item.name} quantity`}>
            <button
              id={`dec-${item.id}`}
              className="qty-btn"
              onClick={() => removeFromCart(item.id)}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="qty-count" aria-live="polite">{qty}</span>
            <button
              id={`inc-${item.id}`}
              className="qty-btn qty-btn-add"
              onClick={() => addToCart(item)}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const activeData = menuCategories.find(c => c.id === activeCategory);

  return (
    <section id="menu" className="section menu-section" aria-labelledby="menu-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">Our Menu</span>
          <h2 id="menu-heading" className="section-title">
            Handpicked with <span>Flavour</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Every dish is prepared fresh with quality ingredients. Choose your favourites and we'll have them ready in minutes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              className={`menu-tab${activeCategory === cat.id ? ' active' : ''}`}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls={`tabpanel-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="tab-emoji">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Category Hero */}
        <div
          id={`tabpanel-${activeData.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeData.id}`}
          className="menu-panel"
        >
          <div className="category-hero">
            <img src={activeData.image} alt={activeData.name} loading="lazy" />
            <div className="category-hero-overlay">
              <div className="category-hero-text">
                <span className="category-emoji">{activeData.emoji}</span>
                <h3>{activeData.name}</h3>
                <p>{activeData.description}</p>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="menu-items-grid">
            {activeData.items.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
