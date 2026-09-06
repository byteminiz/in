import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { businessInfo } from '../data/menuData';
import './CartDrawer.css';

function buildWhatsAppMessage(cartItems, total) {
  const lines = cartItems.map(
    item => `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
  );
  const msg = [
    '🥟 *Byte Miniz Order*',
    '',
    ...lines,
    '',
    `*Total: ₹${total}*`,
    '',
    'Please confirm my order. Thank you! 😊',
  ].join('\n');
  return encodeURIComponent(msg);
}

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();

  const total = getTotalPrice();
  const whatsappMsg = buildWhatsAppMessage(cartItems, total);
  const waLink = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=${whatsappMsg}`;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`cart-drawer${isCartOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <ShoppingBag size={20} />
            <h2>Your Order</h2>
          </div>
          <button
            id="close-cart-btn"
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-emoji">🥟</span>
              <h3>Your cart is empty</h3>
              <p>Add some delicious momos, noodles or beverages to get started!</p>
              <button
                id="go-to-menu-btn"
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul aria-label="Cart items">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className={`cart-item-dot ${item.isVeg ? 'veg' : 'nonveg'}`} />
                    <div>
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">₹{item.price} each</span>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-total">₹{item.price * item.quantity}</span>
                    <div className="cart-qty-control">
                      <button
                        id={`cart-dec-${item.id}`}
                        className="cart-qty-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        id={`cart-inc-${item.id}`}
                        className="cart-qty-btn cart-qty-add"
                        onClick={() => addToCart(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>
            <p className="cart-note">
              📲 Tap below to send your order via WhatsApp. We'll confirm and prepare it fresh for you!
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              id="order-via-whatsapp-btn"
              className="btn btn-primary cart-order-btn"
              aria-label="Place order via WhatsApp"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>
            <button
              id="clear-cart-btn"
              className="btn btn-ghost cart-clear-btn"
              onClick={clearCart}
            >
              <Trash2 size={14} /> Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
