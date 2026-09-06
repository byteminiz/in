import React, { useState, useEffect } from 'react';
import { Download, X, Share, Smartphone, CheckCircle, Sparkles } from 'lucide-react';
import './InstallPWA.css';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Listen for beforeinstallprompt event (Android, Chrome, Edge, Brave, etc.)
    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar from browser
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user dismissed prompt in this session
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        // Show popup after short delay (1.5s) for smooth entrance
        setTimeout(() => {
          setShowPrompt(true);
        }, 1500);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('Byte Miniz PWA installed successfully!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Show prompt for iOS if not dismissed
    if (ios && !sessionStorage.getItem('pwa_prompt_dismissed')) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    // Show Chrome/Android native install prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice outcome: ${outcome}`);

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="pwa-install-overlay">
      <div className="pwa-install-modal animate-slide-up">
        <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Close">
          <X size={20} />
        </button>

        <div className="pwa-modal-header">
          <div className="pwa-app-icon">
            <img src="/pwa-192x192.png" alt="Byte Miniz Icon" />
            <div className="pwa-badge">
              <Sparkles size={12} />
            </div>
          </div>
          <div className="pwa-app-info">
            <h3>Install Byte Miniz App</h3>
            <p>Get fast ordering & offline menu access!</p>
          </div>
        </div>

        <div className="pwa-features-list">
          <div className="pwa-feature-item">
            <CheckCircle size={16} className="feature-icon" />
            <span>Instant 1-Tap Access from Home Screen</span>
          </div>
          <div className="pwa-feature-item">
            <CheckCircle size={16} className="feature-icon" />
            <span>Faster Loading & Offline Menu</span>
          </div>
          <div className="pwa-feature-item">
            <CheckCircle size={16} className="feature-icon" />
            <span>Direct WhatsApp Food Ordering</span>
          </div>
        </div>

        {showIOSInstructions ? (
          <div className="pwa-ios-instructions">
            <p>To install on iPhone / iPad:</p>
            <ol>
              <li>Tap the <strong>Share <Share size={14} inline /></strong> button in Safari toolbar</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
            </ol>
          </div>
        ) : (
          <div className="pwa-modal-actions">
            <button className="btn-install-primary" onClick={handleInstallClick}>
              <Download size={18} />
              <span>Install App Now</span>
            </button>
            <button className="btn-install-secondary" onClick={handleDismiss}>
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
