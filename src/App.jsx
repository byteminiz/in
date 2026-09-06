import './index.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BulkOrder from './components/BulkOrder';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import InstallPWA from './components/InstallPWA';

function App() {
  return (
    <CartProvider>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Menu />
        <BulkOrder />
        <Reviews />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <FloatingWhatsApp />
      <InstallPWA />
    </CartProvider>
  );
}

export default App;
